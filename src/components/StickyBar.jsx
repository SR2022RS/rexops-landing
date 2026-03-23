import { motion, AnimatePresence } from 'framer-motion'
import { agents } from '../data/agents'

export default function StickyBar({ selectedAgents }) {
  const total = selectedAgents.reduce((sum, id) => {
    const a = agents.find((a) => a.id === id)
    return sum + (a?.price || 0)
  }, 0)

  const names = selectedAgents.map((id) => {
    const a = agents.find((a) => a.id === id)
    return a ? `${a.emoji} ${a.name}` : ''
  })

  return (
    <AnimatePresence>
      {selectedAgents.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-t border-white/10 py-3 sm:py-4"
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-white font-body text-sm font-semibold whitespace-nowrap">Your team:</span>
              <div className="flex gap-2 overflow-x-auto">
                {names.map((name) => (
                  <span
                    key={name}
                    className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md font-body whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-white font-heading">
                <motion.span
                  key={total}
                  initial={{ scale: 1.3, color: '#d4a843' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-2xl font-bold"
                >
                  ${total}
                </motion.span>
                <span className="text-gray-400 text-sm">/mo</span>
              </div>
              <a
                href="#builder"
                className="bg-gold hover:bg-gold-light text-navy font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap"
              >
                Get Started →
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
