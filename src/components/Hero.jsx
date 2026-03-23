import { motion } from 'framer-motion'
import { agents } from '../data/agents'

function FloatingCard({ agent, delay, x }) {
  return (
    <div
      className="absolute animate-float-up pointer-events-none"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${14 + Math.random() * 8}s`,
      }}
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
        <span className="text-2xl">{agent.emoji}</span>
        <div>
          <div className="text-white font-semibold text-sm">{agent.name}</div>
          <div className="text-gray-400 text-xs">{agent.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy pt-16">
      {/* Floating agent cards */}
      <div className="absolute inset-0 overflow-hidden">
        {agents.map((agent, i) => (
          <FloatingCard
            key={agent.id}
            agent={agent}
            delay={i * 3}
            x={5 + (i * 13) % 85}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            <span className="text-gray-400 text-sm font-body">Powered by Claude AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Your Rental Business Deserves a{' '}
            <span className="text-gold">Full-Time AI Team</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            Hire individual AI agents trained specifically for short-term rentals —
            each one handling a critical part of your business 24/7.
            No staff. No overhead. Just results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#builder"
              className="bg-gold hover:bg-gold-light text-navy font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-gold/20"
            >
              Build My Agent Team
            </a>
            <a
              href="#how"
              className="border border-white/20 hover:border-white/40 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:bg-white/5"
            >
              See How It Works
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
