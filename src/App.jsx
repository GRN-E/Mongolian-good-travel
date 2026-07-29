import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

import Home from './pages/Home'
import TripsPage from './pages/TripsPage'
import TripDetailPage from './pages/TripDetailPage'
import { DestinationsPage, DestinationDetailPage } from './pages/DestinationPages'
import { WaysToTravelPage, StyleDetailPage } from './pages/StylePages'
import DealsPage from './pages/DealsPage'
import StudyAbroadPage from './pages/StudyAbroadPage'
import AboutPage from './pages/AboutPage'
import { ContactPage, NotFoundPage } from './pages/ContactPage'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-bone text-ink flex flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:slug" element={<TripDetailPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="/ways-to-travel" element={<WaysToTravelPage />} />
          <Route path="/ways-to-travel/:slug" element={<StyleDetailPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
