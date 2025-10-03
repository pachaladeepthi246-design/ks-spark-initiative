import React, { useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

interface WolfResponse {
  score: number
  feedback: string
  scoreColor: string
  scoreLabel: string
  timestamp: string
}

function App() {
  const [pitch, setPitch] = useState('')
  const [response, setResponse] = useState<WolfResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!pitch.trim()) {
      setError('Tell me something about your Web3 skills!')
      return
    }

    setLoading(true)
    setError('')
    setResponse(null)

    try {
      const { data, error } = await supabase.functions.invoke('web3-wolf-agent', {
        body: { pitch: pitch.trim() }
      })

      if (error) {
        throw error
      }

      if (data?.data) {
        setResponse(data.data)
      } else {
        throw new Error('Invalid response from Wolf agent')
      }
    } catch (err: any) {
      console.error('Wolf agent error:', err)
      setError(err.message || 'The Wolf is temporarily unavailable. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-400 border-red-400 bg-red-900/20'
      case 'yellow': return 'text-yellow-400 border-yellow-400 bg-yellow-900/20'
      case 'green': return 'text-green-400 border-green-400 bg-green-900/20'
      case 'gold': return 'text-yellow-300 border-yellow-300 bg-yellow-900/30'
      default: return 'text-blue-400 border-blue-400 bg-blue-900/20'
    }
  }

  const getScoreBgGradient = (color: string) => {
    switch (color) {
      case 'red': return 'from-red-500 to-red-700'
      case 'yellow': return 'from-yellow-500 to-orange-600'
      case 'green': return 'from-green-500 to-emerald-600'
      case 'gold': return 'from-yellow-400 to-amber-500'
      default: return 'from-blue-500 to-cyan-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Web3 Hire Wolf
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-xs"></div>
              <span className="text-cyan-400 text-sm font-mono px-4">SELL YOUR SKILLS</span>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-xs"></div>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Face the ruthless <span className="text-green-400 font-semibold">AI Wolf</span> investor. 
              Get brutal but insightful feedback on your Web3 skills pitch.
              <br />
              <span className="text-cyan-400 text-sm">No mercy. No buzzwords. Only alpha.</span>
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Pitch Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="relative">
                <textarea
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="How will you sell your Web3 skills?"
                  className="w-full h-40 px-6 py-4 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm resize-none text-lg"
                  disabled={loading}
                />
                <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
                  {pitch.length}/2000
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={loading || !pitch.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-400/25"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Wolf is analyzing...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Face the Wolf
                      <span className="text-yellow-400">🐺</span>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mb-8 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 text-center">
                {error}
              </div>
            )}

            {/* Response Display */}
            {response && (
              <div className="animate-fade-in">
                {/* Score Display */}
                <div className="text-center mb-8">
                  <div className={`inline-block px-8 py-4 border-2 rounded-2xl backdrop-blur-sm ${getScoreColorClass(response.scoreColor)}`}>
                    <div className="text-6xl font-bold mb-2">
                      {response.score}/10
                    </div>
                    <div className="text-lg font-semibold uppercase tracking-wider">
                      {response.scoreLabel}
                    </div>
                  </div>
                </div>

                {/* Visual Score Bar */}
                <div className="mb-8">
                  <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreBgGradient(response.scoreColor)} transition-all duration-1000 ease-out`}
                      style={{ width: `${(response.score / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Pathetic</span>
                    <span>Decent</span>
                    <span>Strong</span>
                    <span>Hired!</span>
                  </div>
                </div>

                {/* Wolf Feedback */}
                <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">🐺</div>
                    <div className="text-green-400 font-semibold text-lg">Web3 Wolf says:</div>
                  </div>
                  <blockquote className="text-gray-200 text-lg leading-relaxed font-medium">
                    "{response.feedback}"
                  </blockquote>
                  <div className="mt-4 text-gray-500 text-sm">
                    {new Date(response.timestamp).toLocaleString()}
                  </div>
                </div>

                {/* Try Again Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={() => {
                      setResponse(null)
                      setPitch('')
                      setError('')
                    }}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 rounded-lg transition-all duration-300"
                  >
                    Face the Wolf Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 px-4 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Built by <span className="text-cyan-400 font-semibold">MiniMax Agent</span> • 
            <span className="text-green-400">WAGMI</span> 🚀
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App