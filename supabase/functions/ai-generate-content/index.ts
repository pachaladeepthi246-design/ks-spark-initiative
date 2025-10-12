import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    let systemPrompt = '';
    
    switch (type) {
      case 'innovation':
        systemPrompt = 'You are creating innovative technology project descriptions for a student foundation. Generate creative, technical, and inspiring content about AI and software innovations.';
        break;
      case 'project':
        systemPrompt = 'You are describing student projects for KS Foundation. Generate detailed project descriptions that showcase technical skills, innovation, and real-world impact.';
        break;
      case 'product':
        systemPrompt = 'You are creating product descriptions for AI-powered tools and solutions built by students. Focus on features, benefits, and technical capabilities.';
        break;
      default:
        systemPrompt = 'You are a content generator for KS Foundation, helping create engaging educational and technical content.';
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI API error: ${error}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content || '';

    return new Response(
      JSON.stringify({ content: generatedContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Content generation error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
