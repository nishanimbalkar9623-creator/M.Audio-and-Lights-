import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Cta.css'

const Cta = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="cta section" ref={ref}>
      <div className="container">
        <motion.div
          className="cta__inner"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta__title">LET'S MAKE YOUR NEXT EVENT UNFORGETTABLE.</h2>
          <p className="cta__description">
            Tell us about your event, and our team will help you create the right production setup.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            GET IN TOUCH
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Cta