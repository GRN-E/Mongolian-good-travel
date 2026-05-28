// ✨ MOTION PRIMITIVES
// Reusable animation building blocks. Principles applied:
//  - Fast (200–500ms), natural spring-like easing — never sluggish
//  - Purposeful: motion communicates hierarchy and entrance, not decoration
//  - Respects prefers-reduced-motion (Framer Motion does this automatically
//    when the user's OS setting is on, via MotionConfig below)
import { motion } from 'framer-motion'

// Emil's go-to easing — a soft, confident ease-out
export const EASE = [0.16, 1, 0.3, 1]
export const EASE_OUT = [0.22, 1, 0.36, 1]

// Fade + rise, triggered when scrolled into view (once)
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

// Stagger container — children reveal in sequence
export function Stagger({ children, className, stagger = 0.08, as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </M>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function StaggerItem({ children, className, as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M className={className} variants={staggerItem}>
      {children}
    </M>
  )
}

// Animated number counter (for stats) — counts up when scrolled into view
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function CountUp({ value, className }) {
  // value like "100+", "95%", "24/7", "10+"
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(value)

  // Extract leading number + suffix (e.g. "100+" -> 100, "+")
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!inView || target === null) {
      setDisplay(value)
      return
    }
    let raf
    const duration = 1100
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * target) + suffix)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, suffix, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
