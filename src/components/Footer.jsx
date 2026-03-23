export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-2xl">🤖</span>
              <span className="font-heading text-xl font-bold text-white">
                Rex<span className="text-gold">Ops</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm font-body">
              AI-powered property management for serious STR operators
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#agents" className="text-sm text-gray-400 hover:text-gold transition-colors font-body">Agents</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-gold transition-colors font-body">Pricing</a>
            <a href="#how" className="text-sm text-gray-400 hover:text-gold transition-colors font-body">How It Works</a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-gold transition-colors font-body">FAQ</a>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 font-body">
            Powered by Claude AI &middot; Built on real STR data &middot; Moss Point, MS
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 font-body">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 font-body">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
