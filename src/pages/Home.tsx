import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import ClientLogos from '../components/sections/ClientLogos'
import SocialProof from '../components/sections/SocialProof'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import ServicesPreview from '../components/sections/ServicesPreview'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ClientLogos />
        <FeaturedProjects />
        <SocialProof />
        <ServicesPreview />
      </main>
      <Footer />
    </div>
  )
}

export default Home
