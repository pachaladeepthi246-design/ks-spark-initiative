Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { pitch } = await req.json();

        if (!pitch || typeof pitch !== 'string' || pitch.trim().length === 0) {
            throw new Error('Valid pitch is required');
        }

        // Validate pitch length (reasonable limits)
        if (pitch.length < 10) {
            throw new Error('Pitch is too short. Tell me something substantial.');
        }
        if (pitch.length > 2000) {
            throw new Error('Pitch is too long. Keep it concise, I dont have all day.');
        }

        console.log('Pitch received for analysis:', pitch.substring(0, 100) + '...');

        // Analyze the pitch and generate wolf response
        const analysis = analyzeWeb3Pitch(pitch);
        
        console.log('Analysis completed. Score:', analysis.score);

        const result = {
            data: {
                score: analysis.score,
                feedback: analysis.feedback,
                scoreColor: getScoreColor(analysis.score),
                scoreLabel: getScoreLabel(analysis.score),
                timestamp: new Date().toISOString()
            }
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Web3 Wolf agent error:', error);

        const errorResponse = {
            error: {
                code: 'WEB3_WOLF_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});

// Core analysis function
function analyzeWeb3Pitch(pitch: string): { score: number; feedback: string } {
    const pitchLower = pitch.toLowerCase();
    let score = 0;
    let feedback = '';
    
    // Web3 keywords and their weights
    const web3Keywords = {
        // Core blockchain terms
        'smart contract': 3,
        'defi': 2,
        'dao': 2,
        'nft': 2,
        'dapp': 2,
        'blockchain': 1,
        'ethereum': 2,
        'solidity': 3,
        'gas optimization': 4,
        'reentrancy': 4,
        'audit': 3,
        
        // DeFi specific
        'uniswap': 2,
        'compound': 2,
        'aave': 2,
        'liquidity': 2,
        'yield': 2,
        'staking': 2,
        'amm': 3,
        'tvl': 2,
        'impermanent loss': 3,
        
        // Advanced terms
        'cross-chain': 3,
        'layer 2': 3,
        'rollup': 3,
        'bridge': 2,
        'oracle': 2,
        'merkle': 3,
        'flashloan': 3,
        'governance': 2,
        
        // Security terms
        'vulnerability': 3,
        'exploit': 2,
        'slippage': 2,
        'frontrunning': 3,
        'mev': 4,
        'sandwich attack': 4
    };
    
    // Buzzword penalties
    const buzzwords = ['web3 native', 'disruptive', 'revolutionary', 'game-changing', 'paradigm shift', 'synergistic'];
    
    // Calculate technical score
    let technicalScore = 0;
    for (const [keyword, weight] of Object.entries(web3Keywords)) {
        if (pitchLower.includes(keyword)) {
            technicalScore += weight;
        }
    }
    
    // Penalty for buzzwords
    let buzzwordPenalty = 0;
    for (const buzzword of buzzwords) {
        if (pitchLower.includes(buzzword)) {
            buzzwordPenalty += 2;
        }
    }
    
    // Check for verifiable claims (addresses, repos, etc.)
    const hasEthereumAddress = /0x[a-fA-F0-9]{40}/.test(pitch);
    const hasGithubRepo = /github\.com\/[\w-]+\/[\w-]+/.test(pitch);
    const hasTransactionHash = /0x[a-fA-F0-9]{64}/.test(pitch);
    const hasSpecificNumbers = /\$[0-9,]+|[0-9]+%|[0-9]+x/.test(pitch);
    
    let verifiabilityBonus = 0;
    if (hasEthereumAddress) verifiabilityBonus += 2;
    if (hasGithubRepo) verifiabilityBonus += 2;
    if (hasTransactionHash) verifiabilityBonus += 3;
    if (hasSpecificNumbers) verifiabilityBonus += 1;
    
    // Calculate base score
    const baseScore = Math.min(10, Math.max(0, technicalScore + verifiabilityBonus - buzzwordPenalty));
    
    // Generate contextual feedback based on score and content
    if (baseScore <= 3) {
        score = Math.floor(Math.random() * 4); // 0-3
        feedback = generateHarshFeedback(pitch, pitchLower, technicalScore, buzzwordPenalty);
    } else if (baseScore <= 6) {
        score = 4 + Math.floor(Math.random() * 3); // 4-6
        feedback = generateModerateFeedback(pitch, pitchLower, technicalScore, hasGithubRepo, hasEthereumAddress);
    } else if (baseScore <= 9) {
        score = 7 + Math.floor(Math.random() * 2); // 7-8
        feedback = generatePositiveFeedback(pitch, pitchLower, verifiabilityBonus, hasSpecificNumbers);
    } else {
        score = 9 + Math.floor(Math.random() * 2); // 9-10
        feedback = generateExceptionalFeedback(pitch, hasEthereumAddress, hasGithubRepo, hasTransactionHash);
    }
    
    return { score, feedback };
}

// Harsh feedback for low scores (0-3)
function generateHarshFeedback(pitch: string, pitchLower: string, technicalScore: number, buzzwordPenalty: number): string {
    const harshResponses = [
        "Pathetic. You call yourself a 'Web3 expert' but can't even explain how EIP-155 works. Go learn the basics first.",
        "REKT. Your pitch reads like a ChatGPT prompt gone wrong. Where's the technical depth? Where are the receipts?",
        "This is embarrassing. You're throwing around buzzwords like 'revolutionary' and 'paradigm shift' but have zero substance.",
        "Are you serious? I've seen better Web3 understanding from my grandmother, and she thinks Bitcoin is a casino chip.",
        "Hard pass. Your 'Web3 expertise' sounds like you watched a 5-minute YouTube video and called yourself an expert."
    ];
    
    let response = harshResponses[Math.floor(Math.random() * harshResponses.length)];
    
    if (buzzwordPenalty > 4) {
        response += " Stop with the marketing speak. I want TECHNICAL details, not fluff.";
    }
    
    if (!pitchLower.includes('smart contract') && !pitchLower.includes('solidity')) {
        response += " You don't even mention smart contracts? What kind of Web3 developer are you?";
    }
    
    return response;
}

// Moderate feedback for medium scores (4-6)
function generateModerateFeedback(pitch: string, pitchLower: string, technicalScore: number, hasGithubRepo: boolean, hasEthereumAddress: boolean): string {
    const moderateResponses = [
        "Decent effort, but you're regurgitating crypto buzzwords. 'DeFi native' doesn't mean anything—tell me about the time you fixed a reentrancy bug.",
        "Okay, I see some technical terms, but where's the proof? Talk is cheap in Web3. Show me the contracts, show me the commits.",
        "Not terrible, but not impressive either. You mention DeFi but do you actually understand impermanent loss? Or are you just name-dropping protocols?",
        "Meh. You sound like every other Web3 wannabe. Where's YOUR unique contribution? What have YOU built that matters?"
    ];
    
    let response = moderateResponses[Math.floor(Math.random() * moderateResponses.length)];
    
    if (!hasGithubRepo) {
        response += " No GitHub repo? How am I supposed to verify your 'coding skills'?";
    }
    
    if (!hasEthereumAddress) {
        response += " Where are the contract addresses? I want to see your work on Etherscan.";
    }
    
    return response;
}

// Positive feedback for good scores (7-8)
function generatePositiveFeedback(pitch: string, pitchLower: string, verifiabilityBonus: number, hasSpecificNumbers: boolean): string {
    const positiveResponses = [
        "Finally, someone who gets it. Your gas optimization work sounds legit. I can see you've actually written Solidity code.",
        "Not bad. You mention specific protocols and seem to understand the technical challenges. Keep talking.",
        "Solid. You clearly know your stuff about DeFi mechanics. The technical depth is there.",
        "Respectable. You're not just throwing around buzzwords—you understand the underlying tech."
    ];
    
    let response = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    
    if (hasSpecificNumbers) {
        response += " I like that you're providing concrete metrics. Numbers don't lie.";
    }
    
    if (verifiabilityBonus >= 4) {
        response += " The fact that you're providing verifiable details shows you're not all talk.";
    }
    
    return response;
}

// Exceptional feedback for top scores (9-10)
function generateExceptionalFeedback(pitch: string, hasEthereumAddress: boolean, hasGithubRepo: boolean, hasTransactionHash: boolean): string {
    const exceptionalResponses = [
        "You're hired. That story about recovering funds from a compromised protocol? On-chain, verifiable, and gutsy.",
        "WAGMI. Finally someone who brings receipts. Your smart contract work is solid, and I can verify every claim.",
        "Diamond hands move right here. Your MEV protection implementation? Chef's kiss. This is alpha.",
        "Based. Your understanding of cross-chain security is next level. Send me your wallet address—I'll shoot over an offer."
    ];
    
    let response = exceptionalResponses[Math.floor(Math.random() * exceptionalResponses.length)];
    
    if (hasEthereumAddress && hasTransactionHash) {
        response += " I checked the on-chain data. Everything validates. Respect.";
    }
    
    if (hasGithubRepo) {
        response += " Your GitHub history shows consistent, quality contributions. That's what I want to see.";
    }
    
    return response;
}

// Color coding for scores
function getScoreColor(score: number): string {
    if (score <= 3) return 'red';
    if (score <= 6) return 'yellow';
    if (score <= 9) return 'green';
    return 'gold';
}

// Score labels
function getScoreLabel(score: number): string {
    if (score <= 3) return 'Pathetic';
    if (score <= 6) return 'Decent effort';
    if (score <= 9) return 'Strong';
    return 'Hired!';
}