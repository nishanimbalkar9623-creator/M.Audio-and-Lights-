import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Services.css'

const services = [
  'pro Audio',
  'intelligent lights',
  "professional Dj's",
  'wedding',
  "Dj party's",
  'corpoarts Evets',
  'festivals',
  'Truss',
  'College events',
  'Led Wall screen',
]

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="services section" ref={ref}>
      <div className="container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Services Preview</span>
          <h2 className="section-title">WHAT WE DELIVER</h2>
          <p className="section-description">
            Comprehensive event production services tailored to create extraordinary experiences.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="service-block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <span className="service-block__number">{String(i + 1).padStart(2, '0')}</span>
              <span className="service-block__text">{service}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services