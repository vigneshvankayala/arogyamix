import { Search, Package, Truck, Heart } from "lucide-react";
import familyHealthImage from "@/assets/family-health-analysis.jpg";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Family Health Analysis",
      description: "Complete assessment of your family's health conditions, dietary preferences, and wellness goals through our AI-powered questionnaire.",
      details: ["Health history mapping", "Dietary preference analysis", "Regional food habits assessment"]
    },
    {
      step: "02", 
      icon: Package,
      title: "Custom Kit Creation",
      description: "Our nutritionists and AI engine create personalized grocery kits with exact quantities tailored to your family's specific needs.",
      details: ["Nutritionist-approved selection", "Zero food waste planning", "Calorie & protein optimization"]
    },
    {
      step: "03",
      icon: Truck,
      title: "Careful Preparation",
      description: "Fresh produce sourced directly from our partner farmers in Andhra Pradesh, quality-checked and packed with complete traceability.",
      details: ["Direct farmer sourcing", "Quality assurance checks", "Sustainable packaging"]
    },
    {
      step: "04",
      icon: Heart,
      title: "Monthly Delivery",
      description: "Regular delivery of your personalized health kits with ongoing wellness support, tracking, and continuous optimization.",
      details: ["Flexible delivery schedule", "Wellness coaching included", "Progress monitoring"]
    }
  ];

  const benefits = [
    "Eliminates impulse buying",
    "Prevents overbuying & food wastage",
    "Ensures nutritional planning",
    "Provides exact quantity delivery"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How ArogyaMix 
            <span className="text-primary block">Works for You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A simple 4-step process that transforms how your family shops for groceries and manages health—
            eliminating guesswork and food waste while maximizing nutrition.
          </p>
        </div>
        
        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="text-6xl font-bold text-primary/20">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">Step {step.step}</p>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-gradient-card p-12 rounded-2xl shadow-soft border flex flex-col items-center text-center">
                  {index === 0 ? (
                    <div className="w-full max-w-sm mb-6">
                      <img 
                        src={familyHealthImage} 
                        alt="Family health analysis with wellness charts and healthy lifestyle" 
                        className="w-full h-auto rounded-lg shadow-soft"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                  )}
                  <div className="text-3xl font-bold text-primary mb-2">Step {step.step}</div>
                  <div className="text-foreground font-medium">{step.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Benefits Section */}
        <div className="mt-20">
          <div className="bg-gradient-primary p-10 rounded-2xl shadow-glow text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
              Problems We Solve
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-primary-foreground/10 p-4 rounded-lg border border-primary-foreground/20">
                  <div className="text-primary-foreground font-medium text-sm">{benefit}</div>
                </div>
              ))}
            </div>
            <p className="text-primary-foreground/90 mt-6 max-w-2xl mx-auto">
              With ArogyaMix, experience zero food waste, health-based customization, 
              and intelligent grocery planning that grows with your family's needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;