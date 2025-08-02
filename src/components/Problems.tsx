import { AlertCircle, TrendingDown, Users, Heart } from "lucide-react";

const Problems = () => {
  const healthIssues = [
    "Rising diabetes and PCOS cases",
    "Increasing malnutrition",
    "Heart disease epidemic",
    "Lack of preventive care awareness"
  ];
  
  const foodIssues = [
    "Over-processed food consumption",
    "Lack of food traceability",
    "Farmer exploitation",
    "Nutrition information gap"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            The Dual Crisis We're 
            <span className="text-primary block">Solving Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            India faces interconnected challenges in health and food systems. 
            ArogyaMix addresses both crises with an integrated solution.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Health Crisis */}
          <div className="bg-card rounded-2xl p-8 shadow-soft border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Health Crisis</h3>
                <p className="text-muted-foreground">Growing lifestyle diseases</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {healthIssues.map((issue, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{issue}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <div className="text-sm text-destructive font-medium">Alarming Statistics</div>
              <div className="text-xs text-muted-foreground mt-1">
                77 million Indians have diabetes • 1 in 4 women have PCOS
              </div>
            </div>
          </div>
          
          {/* Food & Nutrition Crisis */}
          <div className="bg-card rounded-2xl p-8 shadow-soft border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Food & Nutrition Gap</h3>
                <p className="text-muted-foreground">Broken food systems</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {foodIssues.map((issue, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{issue}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="text-sm text-accent font-medium">Economic Impact</div>
              <div className="text-xs text-muted-foreground mt-1">
                Farmers earn only 20% of retail price • 40% food wastage
              </div>
            </div>
          </div>
        </div>
        
        {/* Solution Bridge */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-primary p-8 rounded-2xl shadow-glow">
            <Users className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              ArogyaMix: The Bridge Solution
            </h3>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto">
              We connect health-conscious families directly with local farmers, 
              providing personalized nutrition guidance while ensuring fair farmer compensation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;