import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentBooking from "@/components/AppointmentBooking";
import AppointmentsList from "@/components/AppointmentsList";

const Appointments = () => {

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">Book Appointment</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            <AppointmentBooking />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <AppointmentsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Appointments;