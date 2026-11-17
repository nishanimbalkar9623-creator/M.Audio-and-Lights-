import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo-row">
              <img src="/logo.png" alt="Audio & Lights" className="footer__logo" />
              <div>
                <h3 className="footer__name">AUDIO &amp; LIGHTS</h3>
                <span className="footer__tagline">Professional Event Production</span>
              </div>
            </div>
            <p className="footer__description">
              Professional sound, lighting, LED displays and complete technical production
              solutions for unforgettable events in Navi Mumbai and beyond.
            </p>
          </div>

          <div className="footer__links">
            <h4 className="footer__heading">Quick Links</h4>
            <nav className="footer__nav">
              {['Home', 'About', 'Services', 'Completed Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.toLowerCase().replace(' ', '-')) }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer__links">
            <h4 className="footer__heading">Services</h4>
            <nav className="footer__nav">
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services') }}>Sound Systems</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services') }}>DJ Equipment</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services') }}>Stage Lighting</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services') }}>LED Walls</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services') }}>Conference Audio</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services') }}>Technical Operators</a>
            </nav>
          </div>

          <div className="footer__contact">
            <h4 className="footer__heading">Get In Touch</h4>
            <div className="footer__contact-items">
              <span>📍 Navi Mumbai, Maharashtra, India</span>
              <span>📞 +91 XXXXX XXXXX</span>
              <span>✉️ contact@audioandlights.com</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} Audio &amp; Lights. All rights reserved.</p>
          <p className="footer__bottom-tagline">Powering Experiences. Creating Impact.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer