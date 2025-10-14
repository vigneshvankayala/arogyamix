import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, Video } from "lucide-react";
import { z } from "zod";

const appointmentSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(2000, "Description must be less than 2000 characters").optional(),
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
  appointmentType: z.enum(['consultation', 'nutrition', 'fitness', 'follow-up', 'emergency']),
});

const AppointmentBooking = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateGoogleMeetLink = () => {
    const baseUrl = "https://meet.google.com/new";
    return baseUrl;
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input with zod schema
    const validationResult = appointmentSchema.safeParse({
      title: title.trim(),
      description: description || undefined,
      appointmentDate,
      appointmentTime,
      appointmentType,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to book an appointment",
          variant: "destructive",
        });
        return;
      }

      const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
      
      // Validate appointment is not in the past
      if (appointmentDateTime < new Date()) {
        toast({
          title: "Error",
          description: "Cannot book appointments in the past",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const googleMeetLink = generateGoogleMeetLink();

      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            user_id: user.id,
            title,
            description,
            appointment_date: appointmentDateTime.toISOString(),
            appointment_type: appointmentType,
            google_meet_link: googleMeetLink,
            status: 'scheduled'
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your appointment has been booked successfully.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setAppointmentDate("");
      setAppointmentTime("");
      setAppointmentType("");
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to book appointment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Book New Appointment
        </CardTitle>
        <CardDescription>
          Schedule a consultation with our health experts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <div>
            <Input
              placeholder="Appointment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
            />
          </div>
          
          <div>
            <Select value={appointmentType} onValueChange={setAppointmentType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Health Consultation</SelectItem>
                <SelectItem value="nutrition">Nutrition Planning</SelectItem>
                <SelectItem value="fitness">Fitness Assessment</SelectItem>
                <SelectItem value="follow-up">Follow-up Session</SelectItem>
                <SelectItem value="emergency">Emergency Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={2000}
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Video className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              A Google Meet link will be automatically generated for your appointment
            </span>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;