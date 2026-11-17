import { useState, useEffect } from 'react'
import LogoIntro from './components/LogoIntro/LogoIntro'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Gallery from './components/Gallery/Gallery'
import Cta from './components/Cta/Cta'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const handleIntroComplete = () => {
    setIntroComplete(true)
  }

  // Track active section
  useEffect(() => {
    if (!introComplete) return

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [introComplete])

  return (
    <>
      {!introComplete && <LogoIntro onComplete={handleIntroComplete} />}
      <div style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar activeSection={activeSection} />
        <main>
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Cta />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App