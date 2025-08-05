import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2, Sprout, MapPin, Award, Truck } from "lucide-react";

const farmerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  farmName: z.string().min(2, "Farm name is required"),
  farmAddress: z.string().min(5, "Please provide complete farm address"),
  farmSize: z.number().min(0.1, "Farm size must be greater than 0"),
  farmSizeUnit: z.enum(["acres", "hectares"], { required_error: "Please select farm size unit" }),
  experienceYears: z.number().int().min(0).max(50),
  cropTypes: z.array(z.string()).min(1, "Please select at least one crop type"),
  farmingMethods: z.array(z.string()).min(1, "Please select at least one farming method"),
  certifications: z.array(z.string()).optional(),
  irrigationSystem: z.string().optional(),
  soilType: z.string().optional(),
  currentMarkets: z.array(z.string()).optional(),
  monthlyProduction: z.string().optional(),
  transportationMode: z.string().optional(),
  storageCapacity: z.string().optional(),
  challenges: z.string().optional(),
  expectations: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FarmerFormData = z.infer<typeof farmerSchema>;

const FarmerOnboarding = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificationInput, setCertificationInput] = useState("");
  const [marketInput, setMarketInput] = useState("");

  const form = useForm<FarmerFormData>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      cropTypes: [],
      farmingMethods: [],
      certifications: [],
      currentMarkets: [],
    },
  });

  const cropOptions = [
    "Rice", "Wheat", "Maize", "Barley", "Millet",
    "Tomatoes", "Potatoes", "Onions", "Carrots", "Cabbage",
    "Spinach", "Lettuce", "Broccoli", "Cauliflower", "Beans",
    "Mangoes", "Bananas", "Apples", "Oranges", "Grapes",
    "Cotton", "Sugarcane", "Tea", "Coffee", "Spices"
  ];

  const farmingMethodOptions = [
    "Organic Farming", "Conventional Farming", "Hydroponic Farming",
    "Precision Agriculture", "Sustainable Farming", "Integrated Pest Management",
    "Crop Rotation", "Permaculture", "Vertical Farming"
  ];

  const handleSubmit = async (data: FarmerFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("partners").insert({
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        partner_type: "farmer",
        business_name: data.farmName,
        business_address: data.farmAddress,
        experience_years: data.experienceYears,
        certifications: data.certifications,
        specializations: data.cropTypes,
        current_suppliers: data.currentMarkets,
        additional_info: JSON.stringify({
          farmSize: data.farmSize,
          farmSizeUnit: data.farmSizeUnit,
          farmingMethods: data.farmingMethods,
          irrigationSystem: data.irrigationSystem,
          soilType: data.soilType,
          monthlyProduction: data.monthlyProduction,
          transportationMode: data.transportationMode,
          storageCapacity: data.storageCapacity,
          challenges: data.challenges,
          expectations: data.expectations,
          additionalInfo: data.additionalInfo,
        }),
      });

      if (error) throw error;

      toast({
        title: "Welcome to ArogyaMix! 🌱",
        description: "Your farmer application has been submitted successfully. Our team will review it and contact you within 2-3 business days.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting farmer application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCertification = () => {
    if (certificationInput.trim()) {
      const current = form.getValues("certifications") || [];
      form.setValue("certifications", [...current, certificationInput.trim()]);
      setCertificationInput("");
    }
  };

  const addMarket = () => {
    if (marketInput.trim()) {
      const current = form.getValues("currentMarkets") || [];
      form.setValue("currentMarkets", [...current, marketInput.trim()]);
      setMarketInput("");
    }
  };

  const removeCertification = (index: number) => {
    const current = form.getValues("certifications") || [];
    form.setValue("certifications", current.filter((_, i) => i !== index));
  };

  const removeMarket = (index: number) => {
    const current = form.getValues("currentMarkets") || [];
    form.setValue("currentMarkets", current.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sprout className="h-8 w-8" />
              <CardTitle className="text-3xl font-bold">Join ArogyaMix as a Farmer</CardTitle>
            </div>
            <CardDescription className="text-white/90 text-lg">
              Partner with us to connect your fresh produce directly to health-conscious families
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experienceYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Farming Experience *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter years of experience" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Farm Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Farm Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="farmName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your farm name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="farmAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Complete farm address with village/city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="farmSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Size *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="Enter farm size" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="farmSizeUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="acres">Acres</SelectItem>
                              <SelectItem value="hectares">Hectares</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="soilType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soil Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select soil type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="clay">Clay</SelectItem>
                              <SelectItem value="sandy">Sandy</SelectItem>
                              <SelectItem value="loamy">Loamy</SelectItem>
                              <SelectItem value="silt">Silt</SelectItem>
                              <SelectItem value="black">Black Soil</SelectItem>
                              <SelectItem value="red">Red Soil</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="irrigationSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Irrigation System</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select irrigation system" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="drip">Drip Irrigation</SelectItem>
                              <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                              <SelectItem value="flood">Flood Irrigation</SelectItem>
                              <SelectItem value="rainfed">Rain-fed</SelectItem>
                              <SelectItem value="borewell">Borewell</SelectItem>
                              <SelectItem value="canal">Canal Water</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Crop Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Crop Information</h3>
                  
                  {/* Crop Types */}
                  <FormField
                    control={form.control}
                    name="cropTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>What crops do you currently grow? *</FormLabel>
                        <FormDescription>Select all that apply</FormDescription>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {cropOptions.map((crop) => (
                            <FormField
                              key={crop}
                              control={form.control}
                              name="cropTypes"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(crop)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, crop])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== crop
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {crop}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Farming Methods */}
                  <FormField
                    control={form.control}
                    name="farmingMethods"
                    render={() => (
                      <FormItem>
                        <FormLabel>Farming Methods *</FormLabel>
                        <FormDescription>Select all methods you practice</FormDescription>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {farmingMethodOptions.map((method) => (
                            <FormField
                              key={method}
                              control={form.control}
                              name="farmingMethods"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(method)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, method])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== method
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {method}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Certifications */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Certifications & Markets</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <FormLabel>Certifications (e.g., Organic, GAP, Fair Trade)</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        value={certificationInput}
                        onChange={(e) => setCertificationInput(e.target.value)}
                        placeholder="Add certification"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                      />
                      <Button type="button" onClick={addCertification} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.getValues("certifications")?.map((cert, index) => (
                        <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {cert}
                          <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="text-primary hover:text-primary/70"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <FormLabel>Current Markets/Buyers</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        value={marketInput}
                        onChange={(e) => setMarketInput(e.target.value)}
                        placeholder="Add current market/buyer"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMarket())}
                      />
                      <Button type="button" onClick={addMarket} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.getValues("currentMarkets")?.map((market, index) => (
                        <div key={index} className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {market}
                          <button
                            type="button"
                            onClick={() => removeMarket(index)}
                            className="text-secondary-foreground hover:text-secondary-foreground/70"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Production & Logistics */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Production & Logistics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="monthlyProduction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Production Capacity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 500 kg vegetables, 100 kg fruits" {...field} />
                          </FormControl>
                          <FormDescription>Approximate quantity per month</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="storageCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Storage Capacity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Cold storage, warehouse space" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transportationMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transportation Mode</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How do you transport produce?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="own_vehicle">Own Vehicle</SelectItem>
                              <SelectItem value="hired_transport">Hired Transport</SelectItem>
                              <SelectItem value="cooperative">Through Cooperative</SelectItem>
                              <SelectItem value="buyer_pickup">Buyer Picks Up</SelectItem>
                              <SelectItem value="need_support">Need Support</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Challenges & Expectations */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Tell Us More</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="challenges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are your biggest farming challenges?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g., Market access, fair pricing, storage, transportation..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What do you expect from partnering with ArogyaMix?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g., Better prices, direct market access, regular orders..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Anything else you'd like us to know about your farm or farming practices"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Your Application...
                    </>
                  ) : (
                    <>
                      <Sprout className="mr-2 h-5 w-5" />
                      Join ArogyaMix as a Farmer Partner
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerOnboarding;