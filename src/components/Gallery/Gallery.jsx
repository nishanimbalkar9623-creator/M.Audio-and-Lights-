import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './Gallery.css'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

const galleryItems = [
  { src: assetUrl('frames/frame_001.png'), title: 'Corporate Conference' },
  { src: assetUrl('frames/frame_004.png'), title: 'Navratri Celebration' },
  { src: assetUrl('frames/frame_006.png'), title: 'Pre-Wedding Function' },
  { src: assetUrl('frames/frame_009.png'), title: 'Live Concert' },
  { src: assetUrl('frames/frame_011.png'), title: 'Stage Lighting Setup' },
  { src: assetUrl('frames/frame_013.png'), title: 'Ganesh Festival Event' },
  { src: assetUrl('frames/frame_016.png'), title: 'Corporate Seminar' },
  { src: assetUrl('frames/frame_019.png'), title: 'Wedding Reception' },
  { src: assetUrl('frames/frame_021.png'), title: 'Music Festival' },
  { src: assetUrl('frames/frame_024.png'), title: 'LED Wall Installation' },
  { src: assetUrl('frames/frame_027.png'), title: 'Sound System Setup' },
  { src: assetUrl('frames/frame_029.png'), title: 'Outdoor Event' },
]

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [lightboxImage, setLightboxImage] = useState(null)

  // Duplicate the list so the marquee is seamless
  const marqueeItems = [...galleryItems, ...galleryItems]

  return (
    <section id="projects" className="gallery section" ref={ref}>
      <div className="container">
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Completed Projects</span>
          <h2 className="section-title">COMPLETED PROJECTS</h2>
          <p className="section-description">
            A showcase of events we've powered — from corporate conferences to large-scale celebrations.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="gallery__marquee"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="gallery__marquee-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {marqueeItems.map((item, i) => (
            <div key={i} className="gallery__marquee-item" onClick={() => setLightboxImage(item)}>
              <img src={item.src} alt={item.title} loading="lazy" />
              <div className="gallery__marquee-overlay">
                <span className="gallery__marquee-title">{item.title}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="gallery__lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightboxImage.src} alt={lightboxImage.title} />
              <div className="gallery__lightbox-info">
                <h3>{lightboxImage.title}</h3>
              </div>
              <button className="gallery__lightbox-close" onClick={() => setLightboxImage(null)}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery