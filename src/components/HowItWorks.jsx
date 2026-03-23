import { motion } from 'framer-motion'
import { MousePointerClick, Plug, Cpu, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    num: '01',
    title: 'Choose Your Agents',
    desc: 'Pick the agents that match your priorities. Start with one or build the full team.',
  },
  {
    icon: Plug,
    num: '02',
    title: 'We Connect Your Stack',
    desc: 'We connect to your Hospitable, PriceLabs, and communication tools. One onboarding call, we handle the setup.',
  },
  {
    icon: Cpu,
    num: '03',
    title: 'Agents Go to Work',
    desc: 'Your agents start monitoring, analyzing, and finding opportunities immediately. 24/7, no days off.',
  },
  {
    icon: CheckCircle,
    num: '04',
    title: 'You Approve, They Execute',
    desc: 'Every morning Rex briefs you. You approve what matters. Agents handle the rest.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-28 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Up and Running in <span className="text-teal">48 Hours</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%_-_16px)] w-[calc(100%_-_32px)] h-0.5 bg-gradient-to-r from-gold/40 to-gold/10" />
              )}

              <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <step.icon className="text-gold" size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-300 font-body tracking-wider">STEP {step.num}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
