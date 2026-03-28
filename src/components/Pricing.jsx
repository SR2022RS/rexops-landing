import { useState } from 'react'
import { motion } from 'framer-motion'
import { agents, bundles } from '../data/agents'
import { ArrowRight, Check } from 'lucide-react'
import VoiceWidget from './VoiceWidget'

export default function Pricing({ setSelectedAgents }) {
  const [annual, setAnnual] = useState(false)

  function applyBundle(bundle) {
    setSelectedAgents([...bundle.agents])
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Simple, Transparent <span className="text-gold">Pricing</span>
          </h2>
          <p className="text-gray-600 font-body text-lg mb-8">
            Pay per agent. Cancel anytime. No contracts.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-body transition-all ${
                !annual ? 'bg-navy text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-body transition-all ${
                annual ? 'bg-navy text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annual <span className="text-teal text-xs ml-1">2 months free</span>
            </button>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bundles.map((bundle) => {
            const monthlyPrice = bundle.price
            const annualMonthly = Math.round(bundle.price * 10 / 12)
            const displayPrice = annual ? annualMonthly : monthlyPrice

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl border-2 p-6 ${
                  bundle.popular
                    ? 'bg-navy text-white border-gold shadow-xl'
                    : bundle.enterprise
                    ? 'bg-white border-navy'
                    : 'bg-white border-gray-100'
                }`}
              >
                {bundle.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className={`text-lg font-heading font-bold mb-2 ${bundle.popular ? 'text-white' : 'text-navy'}`}>
                  {bundle.name}
                </h3>

                <div className="mb-4">
                  {annual && (
                    <span className={`text-lg line-through mr-2 ${bundle.popular ? 'text-gray-400' : 'text-gray-400'}`}>
                      ${monthlyPrice}
                    </span>
                  )}
                  <span className="text-4xl font-heading font-bold text-gold">${displayPrice}</span>
                  <span className={`text-sm ${bundle.popular ? 'text-gray-400' : 'text-gray-400'}`}>/mo</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {bundle.agents.map((id) => {
                    const a = agents.find((a) => a.id === id)
                    return (
                      <li key={id} className={`flex items-center gap-2 text-sm font-body ${bundle.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Check size={14} className="text-teal flex-shrink-0" /> {a?.emoji} {a?.name}
                      </li>
                    )
                  })}
                </ul>

                <button
                  onClick={() => applyBundle(bundle)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all font-body flex items-center justify-center gap-2 ${
                    bundle.popular
                      ? 'bg-gold text-navy hover:bg-gold-light'
                      : 'bg-navy text-white hover:bg-navy-light'
                  }`}
                >
                  Get Started <ArrowRight size={16} />
                </button>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 space-y-2"
        >
          <p className="text-sm text-gray-500 font-body">
            One-time setup fee: <strong>$197</strong>{' '}
            <span className="text-teal">(waived for annual plans)</span>
          </p>
          <p className="text-sm text-gray-500 font-body">
            Annual plans: <strong>2 months free</strong> — pay for 10, get 12.
          </p>

          <div className="mt-8 flex justify-center">
            <VoiceWidget />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
