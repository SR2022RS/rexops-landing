import { motion, AnimatePresence } from 'framer-motion'
import { agents, bundles } from '../data/agents'
import { Zap, ArrowRight } from 'lucide-react'

export default function TeamBuilder({ selectedAgents, toggleAgent, setSelectedAgents }) {
  const otherCount = selectedAgents.filter((id) => id !== 'rex').length
  const total = selectedAgents.reduce((sum, id) => {
    const a = agents.find((a) => a.id === id)
    return sum + (a?.price || 0)
  }, 0)

  const selectedCount = selectedAgents.length

  // Dynamic suggestions
  const hasScoutAndRate = selectedAgents.includes('scout') && selectedAgents.includes('ratebrain')
  const showRexSuggestion = hasScoutAndRate && !selectedAgents.includes('rex') && otherCount >= 2
  const showFullStackSuggestion = selectedCount >= 4 && selectedCount < 7

  function applyBundle(bundle) {
    setSelectedAgents([...bundle.agents])
  }

  return (
    <section id="builder" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Build Your <span className="text-gold">Team</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto font-body text-lg">
            Select the agents you need. See your monthly total update in real time.
          </p>
        </motion.div>

        {/* Quick toggles */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {agents.map((agent) => {
            const isSelected = selectedAgents.includes(agent.id)
            const isRex = agent.id === 'rex'
            const blocked = isRex && otherCount < 2

            return (
              <motion.button
                key={agent.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => !blocked && toggleAgent(agent.id)}
                disabled={blocked}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-body font-semibold text-sm transition-all ${
                  isSelected
                    ? 'bg-navy text-white border-navy'
                    : blocked
                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-navy border-gray-200 hover:border-gold'
                }`}
              >
                <span className="text-lg">{agent.emoji}</span>
                {agent.name}
                <span className={`text-xs ${isSelected ? 'text-gold' : 'text-gray-400'}`}>
                  ${agent.price}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Dynamic suggestions */}
        <AnimatePresence>
          {showRexSuggestion && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-navy/5 border border-navy/10 rounded-xl p-4 text-center mb-6">
                <span className="text-sm font-body text-navy">
                  <Zap className="inline text-gold mr-1" size={16} />
                  Add <strong>Rex</strong> for just $99 more and get daily briefings on everything
                </span>
              </div>
            </motion.div>
          )}
          {showFullStackSuggestion && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 text-center mb-6">
                <span className="text-sm font-body text-navy">
                  <Zap className="inline text-gold mr-1" size={16} />
                  Switch to <strong>Full Stack</strong> and save ${total - 449}/mo
                  <button
                    onClick={() => applyBundle(bundles[2])}
                    className="ml-3 text-gold font-bold underline"
                  >
                    Apply
                  </button>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Savings badge */}
        {selectedCount >= 3 && (
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1 bg-teal/10 text-teal font-body font-semibold text-sm px-4 py-2 rounded-full">
              Bundle discount available — check the plans below
            </span>
          </div>
        )}

        {/* Bundle cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {bundles.map((bundle) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl border-2 p-6 ${
                bundle.popular ? 'border-gold shadow-lg' : 'border-gray-100'
              } ${bundle.enterprise ? 'bg-navy text-white' : ''}`}
            >
              {bundle.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className={`text-lg font-heading font-bold mb-1 ${bundle.enterprise ? 'text-white' : 'text-navy'}`}>
                {bundle.name}
              </h3>

              <div className="mb-3">
                {bundle.fullPrice > bundle.price && (
                  <span className={`text-sm line-through mr-2 ${bundle.enterprise ? 'text-gray-400' : 'text-gray-400'}`}>
                    ${bundle.fullPrice}
                  </span>
                )}
                <span className={`text-3xl font-heading font-bold ${bundle.enterprise ? 'text-gold' : 'text-gold'}`}>
                  ${bundle.price}
                </span>
                <span className={`text-sm ${bundle.enterprise ? 'text-gray-400' : 'text-gray-400'}`}>/mo</span>
                {bundle.fullPrice > bundle.price && (
                  <span className="ml-2 text-xs bg-teal/10 text-teal font-semibold px-2 py-0.5 rounded-full">
                    Save ${bundle.fullPrice - bundle.price}
                  </span>
                )}
              </div>

              <p className={`text-sm mb-4 ${bundle.enterprise ? 'text-gray-300' : 'text-gray-500'} font-body`}>
                {bundle.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {bundle.agents.map((id) => {
                  const a = agents.find((a) => a.id === id)
                  return (
                    <span key={id} className={`text-xs px-2 py-1 rounded-md ${bundle.enterprise ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'} font-body`}>
                      {a?.emoji} {a?.name}
                    </span>
                  )
                })}
              </div>

              <button
                onClick={() => applyBundle(bundle)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all font-body flex items-center justify-center gap-2 ${
                  bundle.popular
                    ? 'bg-gold text-navy hover:bg-gold-light'
                    : bundle.enterprise
                    ? 'bg-white text-navy hover:bg-gray-100'
                    : 'bg-navy/5 text-navy hover:bg-navy/10'
                }`}
              >
                Select Plan <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
