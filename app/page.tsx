import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import GlobalRelationships from "./components/GlobalRelationships"; // Import the new component
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Services />
      <WhyChooseUs />
      <GlobalRelationships /> {/* Add the new section here */}
      <Portfolio />
      <Testimonials />
      <AboutUs />
      <ContactForm />
    </>
  );
}