import { lazy, Suspense } from 'react'
import PromoBar from '../components/PromoBar'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import FeaturedTrips from '../components/FeaturedTrips'
import Destinations from '../components/Destinations'
import ByStyle from '../components/ByStyle'
import WhatSetsUsApart from '../components/WhatSetsUsApart'
import Reviews from '../components/Reviews'
import PartnersStrip from '../components/PartnersStrip'
import Stories from '../components/Stories'
import CTA from '../components/CTA'
import ErrorBoundary from '../components/shared/ErrorBoundary'

// Heavy 3D globe — lazy-loaded, only fetched when scrolled into view
const ExploreMongolia = lazy(() => import('../components/ExploreMongolia'))

export default function Home() {
  return (
    <>
      <PromoBar />
      <Hero />
      <TrustStrip />
      <ErrorBoundary fallback={null}>
        <Suspense fallback={<div className="h-[600px] bg-bone" />}>
          <ExploreMongolia />
        </Suspense>
      </ErrorBoundary>
      <FeaturedTrips />
      <Destinations />
      <ByStyle />
      <WhatSetsUsApart />
      <Reviews />
      <PartnersStrip />
      <Stories />
      <CTA />
    </>
  )
}
