import Hero from "@/components/Hero";
import About from "@/components/About";
import Problems from "@/components/Problems";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import BusinessModel from "@/components/BusinessModel";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Problems />
      <Features />
      <HowItWorks />
      <BusinessModel />
      <Contact />
    </div>
  );
};

export default Index;
