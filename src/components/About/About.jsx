import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <motion.div
          className="about__content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Trust &amp; Business Overview</span>
          <h2 className="section-title">
            TECHNOLOGY MEETS<br />
            <span className="about__title-accent">LIVE EXPERIENCES.</span>
          </h2>
          <p className="section-description">
            We deliver professional event production solutions with high-quality services,
            technical expertise and reliable execution. From corporate conferences to large-scale
            celebrations, we bring every event to life.
          </p>
          <div className="about__highlights">
            <div className="about__highlight">
              <span className="about__highlight-number">5+</span>
              <span className="about__highlight-label">Years of Experience</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-number">Professional</span>
              <span className="about__highlight-label">Services</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-number">Experienced</span>
              <span className="about__highlight-label">Team</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About