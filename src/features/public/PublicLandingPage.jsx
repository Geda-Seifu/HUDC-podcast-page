import React from 'react'
import Navbar from '../../components/layout/NavBar';
import Hero from './Hero';
import GuestForm from './GuestForm';
import ProjectForm from './ProjectForm';
import ProjectGallery from './ProjectGallerg';
import Footer from './Footer';
import Reveal from '../../components/animation/Reveal';

const PublicLandingPage = () => {
   // This state will eventually come from Supabase 'App Settings'
  const settings = { guestFormOpen: false, projectFormOpen: false };
  return (
    <div className="relative min-h-screen bg-white font-sans selection:bg-hudc-blue selection:text-white">
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
        style={{ 
          backgroundImage: `radial-gradient(#83A3CB 0.8px, transparent 0.8px)`, 
          backgroundSize: '32px 32px' 
        }}
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className=" grow">
      <Hero/>

      <section id="suggest" className="py-20 bg-transparent">
        <Reveal>
        <GuestForm isOpen={settings.guestFormOpen} />
        </Reveal>
      </section>


      <section id="showcase" className="py-20 bg-transparent" >
        <Reveal>
        <ProjectForm isOpen={settings.projectFormOpen} />
        </Reveal>
      </section>


      <section id="gallery" className="py-20 bg-transparent">
        <Reveal>
        <ProjectGallery/>
        </Reveal>
      </section>
</main>
      <Footer/>
    </div>
    </div>)
}

export default PublicLandingPage