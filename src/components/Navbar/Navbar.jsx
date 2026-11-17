import { useState, useEffect } from 'react'
import './Navbar.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Completed Projects' },
  { id: 'contact', label: 'Contact' },
]

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__brand" onClick={(e) => { e.preventDefault(); handleClick('home') }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Audio & Lights" className="navbar__logo" />
          <div className="navbar__brand-text">
            <span className="navbar__name">AUDIO &amp; LIGHTS</span>
          </div>
        </a>

        <div className={`navbar__links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`navbar__link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleClick(item.id) }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="navbar__cta"
            onClick={(e) => { e.preventDefault(); handleClick('contact') }}
          >
            Get a Quote
          </a>
        </div>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar