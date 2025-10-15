import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, Heart, Phone, Calendar } from "lucide-react";
import { z } from "zod";

const phoneRegex = /^[\d\s\-\+\(\)]+$/;

const profileSchema = z.object({
  full_name: z.string().trim().max(100, "Name must be less than 100 characters").optional(),
  phone: z.string().trim().regex(phoneRegex, "Invalid phone number format").max(20, "Phone must be less than 20 characters").optional().or(z.literal("")),
  date_of_birth: z.string().refine((date) => {
    if (!date) return true;
    const birthDate = new Date(date);
    const minDate = new Date("1900-01-01");
    const today = new Date();
    return birthDate >= minDate && birthDate <= today;
  }, "Date of birth must be between 1900 and today").optional().or(z.literal("")),
  health_goals: z.string().max(500, "Health goals must be less than 500 characters").optional(),
  dietary_preferences: z.string().max(500, "Dietary preferences must be less than 500 characters").optional(),
  medical_conditions: z.string().max(500, "Medical conditions must be less than 500 characters").optional(),
  emergency_contact_name: z.string().trim().max(100, "Emergency contact name must be less than 100 characters").optional(),
  emergency_contact_phone: z.string().trim().regex(phoneRegex, "Invalid emergency phone format").max(20, "Emergency phone must be less than 20 characters").optional().or(z.literal("")),
});

const validateArrayItems = (input: string, maxItems: number, maxItemLength: number): string | null => {
  if (!input.trim()) return null;
  const items = input.split(',').map(s => s.trim()).filter(Boolean);
  if (items.length > maxItems) {
    return `Maximum ${maxItems} items allowed`;
  }
  for (const item of items) {
    if (item.length > maxItemLength) {
      return `Each item must be less than ${maxItemLength} characters`;
    }
  }
  return null;
};

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

interface UserProfileProps {
  editMode?: boolean;
  onEditModeChange?: (editing: boolean) => void;
}

const UserProfile = ({ editMode = false, onEditModeChange }: UserProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(editMode);
  const { toast } = useToast();

  useEffect(() => {
    if (editMode) {
      setEditing(true);
    }
  }, [editMode]);

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
      // Validate with zod schema
      const validationResult = profileSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      // Validate array field limits
      const healthGoalsError = validateArrayItems(formData.health_goals, 10, 100);
      const dietaryPrefError = validateArrayItems(formData.dietary_preferences, 10, 100);
      const medicalCondError = validateArrayItems(formData.medical_conditions, 10, 100);

      if (healthGoalsError || dietaryPrefError || medicalCondError) {
        toast({
          title: "Validation Error",
          description: healthGoalsError || dietaryPrefError || medicalCondError || "",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const profileData = {
        user_id: user.id,
        full_name: formData.full_name.trim() || null,
        phone: formData.phone.trim() || null,
        date_of_birth: formData.date_of_birth || null,
        health_goals: formData.health_goals ? formData.health_goals.split(',').map(s => s.trim()).filter(Boolean) : null,
        dietary_preferences: formData.dietary_preferences ? formData.dietary_preferences.split(',').map(s => s.trim()).filter(Boolean) : null,
        medical_conditions: formData.medical_conditions ? formData.medical_conditions.split(',').map(s => s.trim()).filter(Boolean) : null,
        emergency_contact_name: formData.emergency_contact_name.trim() || null,
        emergency_contact_phone: formData.emergency_contact_phone.trim() || null,
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
      if (onEditModeChange) {
        onEditModeChange(false);
      }
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
              onClick={() => {
                setEditing(true);
                if (onEditModeChange) {
                  onEditModeChange(true);
                }
              }}
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
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  maxLength={20}
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
                placeholder="Enter your health goals (comma-separated, max 10 items)"
                rows={2}
                maxLength={500}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Dietary Preferences</label>
              <Textarea
                value={formData.dietary_preferences}
                onChange={(e) => setFormData({ ...formData, dietary_preferences: e.target.value })}
                placeholder="Enter your dietary preferences (comma-separated, max 10 items)"
                rows={2}
                maxLength={500}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Medical Conditions</label>
              <Textarea
                value={formData.medical_conditions}
                onChange={(e) => setFormData({ ...formData, medical_conditions: e.target.value })}
                placeholder="Enter any medical conditions (comma-separated, max 10 items)"
                rows={2}
                maxLength={500}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Emergency Contact Name</label>
                <Input
                  value={formData.emergency_contact_name}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                  placeholder="Emergency contact name"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Emergency Contact Phone</label>
                <Input
                  type="tel"
                  value={formData.emergency_contact_phone}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                  placeholder="Emergency contact phone"
                  maxLength={20}
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
                  if (onEditModeChange) {
                    onEditModeChange(false);
                  }
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