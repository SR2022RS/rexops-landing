import { motion } from 'framer-motion'

const outcomes = [
  { value: 'Full-Year', label: 'Contractor stays achieved' },
  { value: '90%+', label: 'Direct booking rate maintained' },
  { value: '24/7', label: 'Units monitored automatically' },
]

export default function RealData() {
  return (
    <section className="py-20 sm:py-28 bg-navy">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Not Theory. <span className="text-gold">Built From a Real STR Business.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 mb-12"
        >
          <p className="text-gray-300 text-lg leading-relaxed font-body max-w-3xl mx-auto text-center">
            RexOps was built by an STR operator in Moss Point, MS who manages 8 furnished
            units serving contractors at Chevron, Ingalls Shipbuilding, and Plant Daniels
            Power Plant. With 90% direct bookings and guests staying months at a time,
            the system was <span className="text-gold font-semibold">battle-tested on a real portfolio</span> before
            it was ever offered to anyone else.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-heading font-bold text-gold mb-2">{o.value}</div>
              <div className="text-gray-400 font-body">{o.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
