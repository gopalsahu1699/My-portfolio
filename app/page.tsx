import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import OfferSection from "@/components/sections/OfferSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
    return (
        <main className="relative">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <OfferSection />
            <ProjectsSection />
            <ServicesSection />
            <SkillsSection />
            <ContactSection />
            <Footer />
        </main>
    );
}
