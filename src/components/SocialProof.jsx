import { motion } from 'framer-motion'

const stats = [
  { value: '8', label: 'Properties Managed' },
  { value: '90%', label: 'Direct Booking Rate' },
  { value: '24/7', label: 'Monitoring' },
  { value: 'Real', label: 'STR Data' },
  { value: 'Claude', label: 'AI Powered' },
]

export default function SocialProof() {
  return (
    <section className="py-8 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-navy">{s.value}</div>
              <div className="text-sm text-gray-500 font-body mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
