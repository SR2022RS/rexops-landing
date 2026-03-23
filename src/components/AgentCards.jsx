import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { agents } from '../data/agents'

function AgentCard({ agent, selected, onToggle, otherCount }) {
  const [expanded, setExpanded] = useState(false)
  const isRex = agent.id === 'rex'
  const blocked = isRex && otherCount < 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl border-2 transition-all ${
        selected ? 'border-gold shadow-lg shadow-gold/10' : 'border-gray-100 hover:border-gray-200'
      } ${isRex ? 'md:col-span-1' : ''}`}
    >
      {agent.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse-gold">
            Chief Agent
          </span>
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-4xl block mb-3">{agent.emoji}</span>
            <h3 className="text-xl font-heading font-bold text-navy">{agent.name}</h3>
            <p className="text-teal text-sm font-semibold font-body">{agent.role}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-heading font-bold text-gold">${agent.price}</span>
            <span className="text-gray-400 text-sm font-body">/mo</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {agent.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-gray-600 font-body">
              <span className="text-teal mt-0.5 flex-shrink-0">&#10003;</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="flex gap-3 mb-3">
          <button
            onClick={() => {
              if (blocked) return
              onToggle(agent.id)
            }}
            disabled={blocked}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all font-body ${
              selected
                ? 'bg-navy text-white'
                : blocked
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gold/10 text-gold hover:bg-gold/20'
            }`}
          >
            {selected ? '✓ On Your Team' : blocked ? 'Add 2+ Agents First' : 'Add to Team'}
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="w-12 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Toggle details"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {blocked && (
          <p className="text-xs text-orange-500 font-body mt-1">
            Rex requires at least 2 other agents to coordinate.
          </p>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-100 mt-3">
                <p className="text-sm text-gray-500 leading-relaxed font-body">{agent.detail}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function AgentCards({ selectedAgents, toggleAgent }) {
  const otherCount = selectedAgents.filter((id) => id !== 'rex').length

  return (
    <section id="agents" className="py-20 sm:py-28 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Meet Your <span className="text-gold">New Team</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto font-body text-lg">
            Each agent is specialized, always-on, and trained on real STR data
            from the Mississippi Gulf Coast market.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              selected={selectedAgents.includes(agent.id)}
              onToggle={toggleAgent}
              otherCount={otherCount}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
