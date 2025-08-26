import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, Heart, Phone, Calendar } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  health_goals: string[] | null;
  dietary_preferences: string[] | null;
  medical_conditions: string[] | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    date_of_birth: "",
    health_goals: "",
    dietary_preferences: "",
    medical_conditions: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          phone: data.phone || "",
          date_of_birth: data.date_of_birth || "",
          health_goals: data.health_goals?.join(', ') || "",
          dietary_preferences: data.dietary_preferences?.join(', ') || "",
          medical_conditions: data.medical_conditions?.join(', ') || "",
          emergency_contact_name: data.emergency_contact_name || "",
          emergency_contact_phone: data.emergency_contact_phone || "",
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const profileData = {
        user_id: user.id,
        full_name: formData.full_name || null,
        phone: formData.phone || null,
        date_of_birth: formData.date_of_birth || null,
        health_goals: formData.health_goals ? formData.health_goals.split(',').map(s => s.trim()).filter(Boolean) : null,
        dietary_preferences: formData.dietary_preferences ? formData.dietary_preferences.split(',').map(s => s.trim()).filter(Boolean) : null,
        medical_conditions: formData.medical_conditions ? formData.medical_conditions.split(',').map(s => s.trim()).filter(Boolean) : null,
        emergency_contact_name: formData.emergency_contact_name || null,
        emergency_contact_phone: formData.emergency_contact_phone || null,
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
      setEditing(false);
      toast({
        title: "Success!",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Manage your personal information and health preferences
            </CardDescription>
          </div>
          {!editing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditing(true)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {editing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date of Birth</label>
              <Input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Health Goals</label>
              <Textarea
                value={formData.health_goals}
                onChange={(e) => setFormData({ ...formData, health_goals: e.target.value })}
                placeholder="Enter your health goals (comma-separated)"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Dietary Preferences</label>
              <Textarea
                value={formData.dietary_preferences}
                onChange={(e) => setFormData({ ...formData, dietary_preferences: e.target.value })}
                placeholder="Enter your dietary preferences (comma-separated)"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Medical Conditions</label>
              <Textarea
                value={formData.medical_conditions}
                onChange={(e) => setFormData({ ...formData, medical_conditions: e.target.value })}
                placeholder="Enter any medical conditions (comma-separated)"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Emergency Contact Name</label>
                <Input
                  value={formData.emergency_contact_name}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                  placeholder="Emergency contact name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Emergency Contact Phone</label>
                <Input
                  type="tel"
                  value={formData.emergency_contact_phone}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                  placeholder="Emergency contact phone"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setEditing(false);
                  fetchProfile(); // Reset form data
                }}
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Name:</span>
                  <span>{profile?.full_name || "Not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{profile?.phone || "Not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Date of Birth:</span>
                  <span>{profile?.date_of_birth || "Not set"}</span>
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Health Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Health Goals:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {profile?.health_goals?.length ? (
                      profile.health_goals.map((goal, index) => (
                        <Badge key={index} variant="outline">{goal}</Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">Not set</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">Dietary Preferences:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {profile?.dietary_preferences?.length ? (
                      profile.dietary_preferences.map((pref, index) => (
                        <Badge key={index} variant="outline">{pref}</Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">Not set</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-medium">Medical Conditions:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {profile?.medical_conditions?.length ? (
                      profile.medical_conditions.map((condition, index) => (
                        <Badge key={index} variant="outline">{condition}</Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">None specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">{profile?.emergency_contact_name || "Not set"}</span>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{profile?.emergency_contact_phone || "Not set"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;