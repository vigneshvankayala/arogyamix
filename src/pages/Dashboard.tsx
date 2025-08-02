import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Calendar, 
  ShoppingCart, 
  Activity, 
  Target, 
  Zap,
  TrendingUp,
  Heart,
  Apple,
  Clock,
  Plus
} from "lucide-react";

const Dashboard = () => {
  const healthMetrics = [
    { label: "Health Score", value: 78, color: "text-primary", trend: "+5%" },
    { label: "Nutrition Balance", value: 85, color: "text-accent", trend: "+12%" },
    { label: "Immunity Level", value: 72, color: "text-primary-glow", trend: "+8%" },
  ];

  const aiRecommendations = [
    {
      type: "nutrition",
      title: "Increase Iron Intake",
      description: "Based on your recent health analysis, consider adding spinach and lentils to your diet.",
      priority: "high",
      category: "Nutrition"
    },
    {
      type: "exercise",
      title: "Morning Yoga Session",
      description: "Your stress levels indicate benefits from 20-minute morning yoga sessions.",
      priority: "medium", 
      category: "Wellness"
    },
    {
      type: "supplement",
      title: "Vitamin D Supplement",
      description: "Regional analysis suggests Vitamin D supplementation for optimal health.",
      priority: "medium",
      category: "Supplements"
    }
  ];

  const upcomingAppointments = [
    {
      date: "Today, 3:00 PM",
      type: "Nutritionist Consultation",
      doctor: "Dr. Priya Sharma",
      status: "confirmed"
    },
    {
      date: "Tomorrow, 10:00 AM", 
      type: "Health Check-up",
      doctor: "Dr. Rajesh Kumar",
      status: "pending"
    }
  ];

  const recentOrders = [
    {
      id: "NK001",
      name: "Family Nutrition Kit - Premium",
      date: "2 days ago",
      status: "delivered",
      amount: "₹1,299"
    },
    {
      id: "DF005",
      name: "Organic Almonds & Dates",
      date: "1 week ago", 
      status: "delivered",
      amount: "₹750"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, Priya! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your personalized health dashboard
          </p>
        </div>

        {/* Health Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="p-6 bg-gradient-card border shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{metric.label}</h3>
                <Badge variant="outline" className="text-primary">
                  {metric.trend}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className={`text-3xl font-bold ${metric.color}`}>
                  {metric.value}%
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">AI Health Recommendations</h2>
                  <p className="text-sm text-muted-foreground">Personalized insights based on your health data</p>
                </div>
              </div>

              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {rec.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {rec.category}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Zap className="w-4 h-4 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Detailed Analysis
              </Button>
            </Card>

            {/* Recent Orders */}
            <Card className="p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
                    <p className="text-sm text-muted-foreground">Track your nutrition kits and purchases</p>
                  </div>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  New Order
                </Button>
              </div>

              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Apple className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{order.name}</h4>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{order.amount}</div>
                      <Badge 
                        variant={order.status === 'delivered' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 shadow-soft">
              <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Nutrition Kit
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  Update Health Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Wellness Classes
                </Button>
              </div>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="p-6 shadow-soft">
              <h3 className="font-bold text-foreground mb-4">Upcoming Appointments</h3>
              <div className="space-y-3">
                {upcomingAppointments.map((apt, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{apt.date}</span>
                    </div>
                    <h4 className="font-medium text-foreground text-sm">{apt.type}</h4>
                    <p className="text-xs text-muted-foreground">{apt.doctor}</p>
                    <Badge 
                      variant={apt.status === 'confirmed' ? 'secondary' : 'outline'}
                      className="text-xs mt-2"
                    >
                      {apt.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button size="sm" variant="outline" className="w-full mt-4">
                View All Appointments
              </Button>
            </Card>

            {/* Health Goal */}
            <Card className="p-6 shadow-soft bg-gradient-hero text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6" />
                <h3 className="font-bold">This Month's Goal</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">
                Improve immunity score by 15% through nutrition optimization
              </p>
              <Progress value={65} className="h-2 mb-2" />
              <p className="text-xs opacity-75">65% completed</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;