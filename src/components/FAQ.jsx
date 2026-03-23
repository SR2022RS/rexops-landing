import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What tools do I need to already have?',
    a: 'Hospitable (or any major PMS), PriceLabs (recommended), and a Telegram or WhatsApp account for daily briefings. We handle everything else during setup.',
  },
  {
    q: 'Do I need technical knowledge?',
    a: "None. We set everything up for you during onboarding. You interact with your agents through plain conversation on your phone — just like texting an employee.",
  },
  {
    q: 'Can I add or remove agents later?',
    a: 'Yes. Your team is fully flexible. Add agents as your needs grow, remove any that aren\'t delivering value. No lock-in on individual agents.',
  },
  {
    q: "What's the 30-day guarantee?",
    a: "If your agents don't identify at least one meaningful pricing opportunity, lead, or booking improvement in your first 30 days, we'll refund your first month. No questions asked.",
  },
  {
    q: 'Do my agents work for other clients too?',
    a: "Your agents are configured specifically for your market, your properties, and your pricing strategy. The intelligence is yours — not shared across clients.",
  },
  {
    q: 'What if I only have 1-2 properties?',
    a: 'The system scales to any portfolio size. Many single-property owners start with Scout + RateBrain for smarter pricing and demand intelligence.',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-navy font-heading font-semibold text-lg pr-8">{faq.q}</span>
        <span className="text-gold flex-shrink-0">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 font-body pb-5 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-cream-dark">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Common Questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-100 px-6 sm:px-8"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
