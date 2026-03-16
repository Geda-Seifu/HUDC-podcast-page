import React from "react";
import Navbar from "../components/layout/NavBar";
import Hero from "../features/public/Hero";
import GuestForm from "../features/public/GuestForm";
import ProjectForm from "../features/public/ProjectForm";
import ProjectGallery from "../features/public/ProjectGallerg";
import Footer from "../components/layout/Footer";
import Reveal from "../components/animation/Reveal";
import { useQuery } from "@tanstack/react-query";
import { fetchSystemConfig } from "../api/admin";

const PublicLandingPage = () => {
  // 1. Fetch the remote settings from Supabase
  const { data: config = [] } = useQuery({
    queryKey: ["system_config"],
    queryFn: fetchSystemConfig,
    refetchInterval: 5000, //refresh every 5 second
    refetchOnWindowFocus: true,
  });

  // 2. Derive the booleans from the database array
  // We check the 'is_enabled' field for each specific ID
  const guestFormOpen =
    config.find((c) => c.id === "guest_form")?.is_enabled ?? true;
  const projectFormOpen =
    config.find((c) => c.id === "project_form")?.is_enabled ?? true;
  return (
    <div className="relative min-h-screen bg-white font-sans selection:bg-hudc-blue selection:text-white">
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#83A3CB 0.8px, transparent 0.8px)`,
          backgroundSize: "32px 32px",
        }}
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className=" grow">
          <Hero />

          <section id="suggest" className="py-20 bg-transparent">
            <Reveal>
              <GuestForm isOpen={guestFormOpen} />
            </Reveal>
          </section>

          <section id="showcase" className="py-20 bg-transparent">
            <Reveal>
              <ProjectForm isOpen={projectFormOpen} />
            </Reveal>
          </section>

          <section id="gallery" className="py-20 bg-transparent">
            <Reveal>
              <ProjectGallery />
            </Reveal>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PublicLandingPage;
