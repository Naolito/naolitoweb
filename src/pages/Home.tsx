import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ImpactShowcase from '../components/sections/ImpactShowcase'
import HomeworkDisney from '../components/sections/HomeworkDisney'
import ClientLogos from '../components/sections/ClientLogos'
import PastClientProjects from '../components/sections/PastClientProjects'
import SocialProof from '../components/sections/SocialProof'
import ServicesPreview from '../components/sections/ServicesPreview'
import StudioOriginals from '../components/sections/StudioOriginals'

const Home = () => {
  const showStudioOriginals = false

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ImpactShowcase />
        <ClientLogos />
        {showStudioOriginals && <StudioOriginals />}
        <HomeworkDisney />
        <PastClientProjects />
        <SocialProof />
        <ServicesPreview />
      </main>
      <Footer />
    </div>
  )
}

export default Home
