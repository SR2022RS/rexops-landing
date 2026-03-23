import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Agents', href: '#agents' },
    { label: 'Build Your Team', href: '#builder' },
    { label: 'How It Works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-heading text-xl font-bold text-white">
              Rex<span className="text-gold">Ops</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-gray-300 hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#builder"
              className="bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-navy border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-gold py-2 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#builder"
                onClick={() => setOpen(false)}
                className="bg-gold text-navy font-semibold text-center py-3 rounded-lg mt-2"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
