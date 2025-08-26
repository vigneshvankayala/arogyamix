import { ShoppingCart, Brain, BarChart3, Heart, Store, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Grocery + Nutrition Kits",
      description: "Monthly/single-order kits tailored to your family's health needs, designed by nutritionists with complete calorie and immunity tracking.",
      highlights: ["Personalized to health conditions", "Age-specific nutrition", "Regional food preferences"]
    },
    {
      icon: Brain,
      title: "AI Nutritionist Engine",
      description: "Smart recommendations based on family health history, medical conditions, and dietary preferences with daily meal planning.",
      highlights: ["Family health analysis", "Medical condition mapping", "Cultural food integration"]
    },
    {
      icon: BarChart3,
      title: "Health Dashboard",
      description: "Live tracking of diet performance, health improvement scores, and grocery impact metrics with detailed analytics.",
      highlights: ["Real-time health metrics", "Progress tracking", "Family wellness insights"]
    },
    {
      icon: Heart,
      title: "Mental & Physical Wellness",
      description: "Weekly yoga, meditation classes, and chat/video support with mental health professionals plus gamified wellness tracking.",
      highlights: ["Expert-led classes", "Mental health support", "Wellness gamification"]
    },
    {
      icon: Store,
      title: "Direct from Farmers",
      description: "Organic produce directly from Andhra Pradesh farmers with complete traceability, seasonal items, and transparent pricing.",
      highlights: ["Zero middlemen", "Complete traceability", "Fair farmer pricing"]
    },
    {
      icon: Smartphone,
      title: "Smart Health Ecosystem",
      description: "Integrated mobile app with WhatsApp support, secure health data storage, and future IoT kitchen hardware compatibility.",
      highlights: ["Multi-platform access", "Secure data storage", "IoT ready infrastructure"]
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Complete Wellness 
            <span className="text-primary block">Ecosystem</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Six integrated solutions working together to transform your family's health journey 
            from grocery shopping to wellness tracking.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-card p-8 rounded-2xl shadow-soft border hover:shadow-glow transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-2 mb-6">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-hero p-12 rounded-2xl shadow-glow">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Family's Health?
            </h3>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of families who've already started their personalized wellness journey with ArogyaMix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;