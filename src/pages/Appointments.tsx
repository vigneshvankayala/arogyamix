import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video,
  Phone,
  MapPin,
  Star,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Clinical Nutritionist",
      experience: "8 years",
      rating: 4.9,
      reviews: 156,
      languages: ["Hindi", "English", "Telugu"],
      consultationFee: 500,
      image: "/placeholder.svg",
      nextAvailable: "Today",
      consultationTypes: ["video", "chat", "clinic"]
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Ayurvedic Physician",
      experience: "12 years", 
      rating: 4.8,
      reviews: 203,
      languages: ["Hindi", "English", "Punjabi"],
      consultationFee: 600,
      image: "/placeholder.svg",
      nextAvailable: "Tomorrow",
      consultationTypes: ["video", "clinic"]
    },
    {
      id: 3,
      name: "Dr. Meera Reddy",
      specialization: "Wellness Coach",
      experience: "6 years",
      rating: 4.7,
      reviews: 89,
      languages: ["Telugu", "English", "Tamil"],
      consultationFee: 400,
      image: "/placeholder.svg",
      nextAvailable: "Today",
      consultationTypes: ["video", "chat"]
    }
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Priya Sharma",
      specialization: "Clinical Nutritionist",
      date: "Today",
      time: "3:00 PM",
      type: "video",
      status: "confirmed",
      meetingLink: "https://meet.arogyamix.in/abc123"
    },
    {
      id: 2,
      doctorName: "Dr. Rajesh Kumar", 
      specialization: "Ayurvedic Physician",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "clinic",
      status: "pending",
      address: "ArogyaMix Clinic, Sector 15, Noida"
    }
  ];

  const pastAppointments = [
    {
      id: 1,
      doctorName: "Dr. Meera Reddy",
      specialization: "Wellness Coach",
      date: "2 days ago",
      time: "11:00 AM",
      type: "video",
      status: "completed",
      rating: 5,
      notes: "Discussed nutrition plan and stress management techniques"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'secondary';
      case 'pending': return 'outline';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'clinic': return <MapPin className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Health Appointments
          </h1>
          <p className="text-lg text-muted-foreground">
            Book consultations with certified health experts
          </p>
        </div>

        <Tabs defaultValue="book" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book">Book Appointment</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Book Appointment */}
          <TabsContent value="book" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Doctor Selection */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Choose Your Expert</h2>
                
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <Card key={doctor.id} className="p-6 shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer border-2 hover:border-primary">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-card rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                              <p className="text-primary font-medium">{doctor.specialization}</p>
                              <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                            </div>
                            <Badge variant="outline" className="text-primary">
                              Available {doctor.nextAvailable}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {doctor.consultationTypes.map((type) => (
                                <div key={type} className="flex items-center gap-1 text-xs text-muted-foreground">
                                  {getTypeIcon(type)}
                                  <span className="capitalize">{type}</span>
                                </div>
                              ))}
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-foreground">₹{doctor.consultationFee}</div>
                              <div className="text-xs text-muted-foreground">Consultation fee</div>
                            </div>
                          </div>
                          
                          <Button className="w-full mt-4">
                            Select Dr. {doctor.name.split(' ')[1]}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-6">
                <Card className="p-6 shadow-soft">
                  <h3 className="text-xl font-bold text-foreground mb-6">Select Date & Time</h3>
                  
                  <div className="space-y-6">
                    {/* Calendar */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Choose Date</Label>
                      <div className="border border-border rounded-lg p-4">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="w-full"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Available Time Slots</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedSlot === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSlot(slot)}
                            className="text-xs"
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Consultation Type */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Consultation Type</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-1" />
                          Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          Clinic
                        </Button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <Label htmlFor="notes" className="text-sm font-medium mb-2 block">
                        Additional Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Describe your health concerns or questions..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <Button className="w-full" size="lg">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Book Appointment - ₹500
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Upcoming Appointments */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Upcoming Appointments</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Book New
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-6 shadow-soft">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{appointment.doctorName}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            {getTypeIcon(appointment.type)}
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                        </div>

                        {appointment.meetingLink && (
                          <div className="mt-2">
                            <a href={appointment.meetingLink} className="text-sm text-primary hover:underline">
                              Join Meeting Link
                            </a>
                          </div>
                        )}

                        {appointment.address && (
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">{appointment.address}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(appointment.status)}>
                        {appointment.status === 'confirmed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {appointment.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {appointment.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {appointment.status === 'confirmed' ? 'Reschedule' : 'Cancel'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointment History */}
          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Appointment History</h2>

            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-6 shadow-soft">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{appointment.doctorName}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            {getTypeIcon(appointment.type)}
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm text-foreground">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={getStatusColor(appointment.status)}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {appointment.status}
                      </Badge>
                      
                      {appointment.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(appointment.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                          ))}
                        </div>
                      )}
                      
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Appointments;