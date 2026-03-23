import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-navy relative overflow-hidden">
      {/* Gold accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Competition Is Still{' '}
            <span className="text-gold">Doing This Manually.</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 font-body leading-relaxed max-w-2xl mx-auto">
            Every day without intelligent agents is a day of missed contractor bookings,
            stale pricing, and guests who never came back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#builder"
              className="bg-gold hover:bg-gold-light text-navy font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-gold/20"
            >
              Build My Agent Team Now
            </a>
            <a
              href="mailto:hello@rexops.com"
              className="border border-white/20 hover:border-white/40 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:bg-white/5"
            >
              Book a 15-Minute Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
