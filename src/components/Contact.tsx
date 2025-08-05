import { Mail, Phone, Globe, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import farmersImage from "@/assets/farmers-field.jpg";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@arogyamix.in",
      href: "mailto:contact@arogyamix.in"
    },
    {
      icon: Globe,
      label: "Website", 
      value: "www.arogyamix.in",
      href: "https://www.arogyamix.in"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7386588429",
      href: "tel:+917386588429"
    },
    {
      icon: Phone,
      label: "Support",
      value: "+91 9666683013", 
      href: "tel:+919666683013"
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/arogyamix"
    },
    {
      icon: Twitter,
      label: "Twitter", 
      href: "https://twitter.com/arogyamix"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/company/arogyamix"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Join the Movement
                <span className="text-primary block">Towards Healthier India</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                ArogyaMix is not just a startup – it is a movement towards sustainable, 
                preventive, and inclusive health in India. Let's join hands to build India's 
                first health-first, farmer-connected, AI-driven grocery ecosystem.
              </p>
            </div>
            
            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Get in Touch</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-soft border hover:shadow-glow transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{method.label}</div>
                      <div className="font-medium text-foreground">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Follow Our Journey</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">@arogyamix on all platforms</p>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-glow">
              <img 
                src={farmersImage} 
                alt="Farmers in fields" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/20"></div>
            </div>
            
            {/* Impact Stats */}
            <div className="absolute -bottom-8 left-4 right-4 bg-card p-6 rounded-xl shadow-soft border">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Projected Impact by 2027</div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xl font-bold text-primary">2x</div>
                    <div className="text-xs text-muted-foreground">Farmer Income</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">30K+</div>
                    <div className="text-xs text-muted-foreground">Families Served</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">50%</div>
                    <div className="text-xs text-muted-foreground">Disease Prevention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-hero p-12 rounded-2xl shadow-glow">
            <h3 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Transform Healthcare in India?
            </h3>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Whether you're an investor, farmer, or health-conscious family, 
              join us in building a healthier, more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partner-onboarding">
                <Button variant="hero" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Partner With Us
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Download Pitch Deck
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;