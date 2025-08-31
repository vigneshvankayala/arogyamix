import familyImage from "@/assets/farmers-field.jpg";

const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Transforming How Indian Families 
                <span className="text-primary block">Consume & Care</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ArogyaMix envisions a future where every Indian family has access to personalized nutrition, 
                fresh groceries from local farmers, and comprehensive wellness support—all integrated into 
                one seamless platform.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Our Vision</h3>
              <p className="text-muted-foreground">
                To become India's #1 personalized health and grocery ecosystem that empowers both families and farmers, 
                creating a sustainable bridge between farm-fresh nutrition and family wellness.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">₹50L+</div>
                <div className="text-sm text-muted-foreground">Direct to Farmers</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Health Support</div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-glow">
              <img 
                src={familyImage} 
                alt="Farmers working in agricultural field" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-soft border">
              <div className="text-sm text-muted-foreground mb-1">Health Score Improvement</div>
              <div className="text-2xl font-bold text-primary">+78%</div>
              <div className="text-xs text-muted-foreground">Average family wellness</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;