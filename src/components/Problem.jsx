import { motion } from 'framer-motion'
import { TrendingDown, UserX, SearchX } from 'lucide-react'

const pains = [
  {
    icon: TrendingDown,
    title: "You're leaving money on the table",
    desc: 'Bad pricing, missed contractor demand, gaps that should have been filled weeks ago. Every empty night is revenue you never get back.',
  },
  {
    icon: UserX,
    title: "Your guests aren't coming back",
    desc: "No follow-up system. No relationship tracking. The contractor who stayed 30 days last year? Someone else booked them first.",
  },
  {
    icon: SearchX,
    title: 'You have no pipeline',
    desc: 'No B2B outreach, no insurance contacts, no military connections. You wait for bookings instead of creating them.',
  },
]

export default function Problem() {
  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Running a Rental Business Is a Full-Time Job.{' '}
            <span className="text-teal">It Shouldn't Be.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-5">
                <p.icon className="text-navy" size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">{p.title}</h3>
              <p className="text-gray-600 leading-relaxed font-body">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
