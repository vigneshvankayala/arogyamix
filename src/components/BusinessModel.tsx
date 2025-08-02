import { CreditCard, Calendar, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const BusinessModel = () => {
  const subscriptionPlans = [
    {
      name: "Essential",
      price: "799",
      duration: "month",
      features: ["Basic nutrition kits", "Monthly health tracking", "Farmer-direct produce", "WhatsApp support"],
      popular: false
    },
    {
      name: "Family Plus", 
      price: "1,299",
      duration: "month",
      features: ["Personalized nutrition kits", "AI meal planning", "Wellness classes", "Priority support", "Health dashboard"],
      popular: true
    },
    {
      name: "Premium Care",
      price: "1,999", 
      duration: "month",
      features: ["Complete health ecosystem", "Personal nutritionist", "Mental health support", "IoT integration", "24/7 care team"],
      popular: false
    }
  ];

  const revenueStreams = [
    {
      icon: Calendar,
      title: "Monthly Subscriptions",
      description: "Recurring revenue from personalized nutrition kit subscriptions",
      range: "₹799 - ₹1,999/month"
    },
    {
      icon: CreditCard,
      title: "One-time Orders",
      description: "Direct organic grocery purchases without subscription commitment",
      range: "Flexible pricing"
    },
    {
      icon: Users,
      title: "Health Coaching",
      description: "Premium add-ons for specialized nutritionist and wellness consultations",
      range: "₹500 - ₹2,000/session"
    },
    {
      icon: Zap,
      title: "IoT Hardware",
      description: "Future smart kitchen devices for automated health tracking",
      range: "₹5,000 - ₹15,000"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Smart Pricing for 
            <span className="text-primary block">Every Family</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transparent, affordable pricing that's lower than market rates for organic quality 
            while ensuring fair compensation to our farmer partners.
          </p>
        </div>
        
        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {subscriptionPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-card rounded-2xl p-8 shadow-soft border transition-all duration-300 hover:shadow-glow ${
                plan.popular ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">₹{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.duration}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                size="lg" 
                className="w-full"
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
        
        {/* Revenue Streams */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Diversified Revenue Streams
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="bg-gradient-card p-6 rounded-xl shadow-soft border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <stream.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">{stream.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{stream.description}</p>
                <div className="text-sm font-medium text-primary">{stream.range}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pricing Philosophy */}
        <div className="bg-gradient-hero p-10 rounded-2xl shadow-glow text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
            Our Pricing Philosophy
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-foreground/10 p-6 rounded-lg border border-primary-foreground/20">
              <h4 className="font-bold text-primary-foreground mb-2">Lower Than Market</h4>
              <p className="text-primary-foreground/90 text-sm">
                Premium organic quality at 15-20% lower prices than traditional organic stores
              </p>
            </div>
            <div className="bg-primary-foreground/10 p-6 rounded-lg border border-primary-foreground/20">
              <h4 className="font-bold text-primary-foreground mb-2">Fair Farmer Share</h4>
              <p className="text-primary-foreground/90 text-sm">
                Farmers receive 60-70% of retail price vs industry standard 20-30%
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button variant="hero" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get Special Launch Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;