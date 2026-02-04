import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import ClientLogos from '../components/sections/ClientLogos'
import SocialProof from '../components/sections/SocialProof'
import ServicesPreview from '../components/sections/ServicesPreview'
import StudioOriginals from '../components/sections/StudioOriginals'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <StudioOriginals />
        <Hero />
        <ClientLogos />
        <SocialProof />
        <ServicesPreview />
      </main>
      <Footer />
    </div>
  )
}

export default Home
