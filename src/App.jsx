import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Problem from './components/Problem'
import AgentCards from './components/AgentCards'
import TeamBuilder from './components/TeamBuilder'
import HowItWorks from './components/HowItWorks'
import RealData from './components/RealData'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import StickyBar from './components/StickyBar'

export default function App() {
  const [selectedAgents, setSelectedAgents] = useState([])

  const toggleAgent = useCallback((id) => {
    setSelectedAgents((prev) => {
      if (prev.includes(id)) {
        // If removing Rex's required agents, also remove Rex
        const next = prev.filter((a) => a !== id)
        const otherCount = next.filter((a) => a !== 'rex').length
        if (otherCount < 2 && next.includes('rex')) {
          return next.filter((a) => a !== 'rex')
        }
        return next
      } else {
        return [...prev, id]
      }
    })
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <AgentCards selectedAgents={selectedAgents} toggleAgent={toggleAgent} />
      <TeamBuilder selectedAgents={selectedAgents} toggleAgent={toggleAgent} setSelectedAgents={setSelectedAgents} />
      <HowItWorks />
      <RealData />
      <Pricing setSelectedAgents={setSelectedAgents} />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBar selectedAgents={selectedAgents} />
    </>
  )
}
