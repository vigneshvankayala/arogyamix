import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, Video, ExternalLink } from "lucide-react";
import { format } from "date-fns";

const isValidMeetLink = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'meet.google.com' && urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  appointment_date: string;
  appointment_type: string;
  status: string;
  google_meet_link: string | null;
  duration_minutes: number;
}

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('appointment_date', { ascending: true });

      if (error) {
        throw error;
      }

      setAppointments(data || []);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'rescheduled':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatAppointmentType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const isUpcoming = (appointmentDate: string) => {
    return new Date(appointmentDate) > new Date();
  };

  const upcomingAppointments = appointments.filter(apt => 
    isUpcoming(apt.appointment_date) && apt.status === 'scheduled'
  );

  const pastAppointments = appointments.filter(apt => 
    !isUpcoming(apt.appointment_date) || apt.status !== 'scheduled'
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading appointments...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Appointments
          </CardTitle>
          <CardDescription>
            Your scheduled consultations and sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No upcoming appointments scheduled
            </p>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{appointment.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatAppointmentType(appointment.appointment_type)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(appointment.appointment_date), 'PPP')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(new Date(appointment.appointment_date), 'p')}
                    </div>
                  </div>

                  {appointment.description && (
                    <p className="text-sm text-muted-foreground">
                      {appointment.description}
                    </p>
                  )}

                  {appointment.google_meet_link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (appointment.google_meet_link && isValidMeetLink(appointment.google_meet_link)) {
                          window.open(appointment.google_meet_link, '_blank', 'noopener,noreferrer');
                        } else {
                          toast({
                            title: "Invalid Link",
                            description: "The meeting link is not valid",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      <Video className="h-4 w-4" />
                      Join Meeting
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Past Appointments</CardTitle>
            <CardDescription>
              Your appointment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 space-y-3 opacity-75">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{appointment.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatAppointmentType(appointment.appointment_type)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(appointment.appointment_date), 'PPP')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(new Date(appointment.appointment_date), 'p')}
                    </div>
                  </div>

                  {appointment.description && (
                    <p className="text-sm text-muted-foreground">
                      {appointment.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentsList;