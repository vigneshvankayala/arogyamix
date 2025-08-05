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
import { toast } from "@/components/ui/use-toast";
import { Loader2, Users, Stethoscope, Store } from "lucide-react";

const partnerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  partnerType: z.enum(["farmer", "nutritionist", "retailer"], {
    required_error: "Please select a partner type",
  }),
  businessName: z.string().optional(),
  businessAddress: z.string().optional(),
  experienceYears: z.number().int().min(0).max(50).optional(),
  certifications: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),
  businessSize: z.string().optional(),
  currentSuppliers: z.array(z.string()).optional(),
  targetMarket: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

const PartnerOnboarding = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificationInput, setCertificationInput] = useState("");
  const [specializationInput, setSpecializationInput] = useState("");
  const [supplierInput, setSupplierInput] = useState("");

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      certifications: [],
      specializations: [],
      currentSuppliers: [],
    },
  });

  const partnerType = form.watch("partnerType");

  const handleSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("partners").insert({
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        partner_type: data.partnerType,
        business_name: data.businessName,
        business_address: data.businessAddress,
        experience_years: data.experienceYears,
        certifications: data.certifications,
        specializations: data.specializations,
        business_size: data.businessSize,
        current_suppliers: data.currentSuppliers,
        target_market: data.targetMarket,
        additional_info: data.additionalInfo,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in partnering with ArogyaMix. We'll review your application and get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting application:", error);
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

  const addSpecialization = () => {
    if (specializationInput.trim()) {
      const current = form.getValues("specializations") || [];
      form.setValue("specializations", [...current, specializationInput.trim()]);
      setSpecializationInput("");
    }
  };

  const addSupplier = () => {
    if (supplierInput.trim()) {
      const current = form.getValues("currentSuppliers") || [];
      form.setValue("currentSuppliers", [...current, supplierInput.trim()]);
      setSupplierInput("");
    }
  };

  const removeCertification = (index: number) => {
    const current = form.getValues("certifications") || [];
    form.setValue("certifications", current.filter((_, i) => i !== index));
  };

  const removeSpecialization = (index: number) => {
    const current = form.getValues("specializations") || [];
    form.setValue("specializations", current.filter((_, i) => i !== index));
  };

  const removeSupplier = (index: number) => {
    const current = form.getValues("currentSuppliers") || [];
    form.setValue("currentSuppliers", current.filter((_, i) => i !== index));
  };

  const getPartnerIcon = (type: string) => {
    switch (type) {
      case "farmer":
        return <Users className="h-5 w-5" />;
      case "nutritionist":
        return <Stethoscope className="h-5 w-5" />;
      case "retailer":
        return <Store className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary to-primary-glow text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Become Our Partner</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Join ArogyaMix as a farmer, nutritionist, or retailer and help us revolutionize healthy living
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Basic Information</h3>
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
                      name="partnerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partner Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select partner type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="farmer">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  Farmer
                                </div>
                              </SelectItem>
                              <SelectItem value="nutritionist">
                                <div className="flex items-center gap-2">
                                  <Stethoscope className="h-4 w-4" />
                                  Nutritionist
                                </div>
                              </SelectItem>
                              <SelectItem value="retailer">
                                <div className="flex items-center gap-2">
                                  <Store className="h-4 w-4" />
                                  Retailer
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Business Information */}
                {partnerType && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      {getPartnerIcon(partnerType)}
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {partnerType === "farmer" ? "Farm Name" : 
                               partnerType === "nutritionist" ? "Practice/Clinic Name" : 
                               "Business Name"}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter business name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter business address" {...field} />
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
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Enter years of experience" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {partnerType === "retailer" && (
                        <FormField
                          control={form.control}
                          name="businessSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Size</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select business size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="small">Small (1-10 employees)</SelectItem>
                                  <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                                  <SelectItem value="large">Large (50+ employees)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Professional Details */}
                {partnerType && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground">Professional Details</h3>
                    
                    {/* Certifications */}
                    <div className="space-y-3">
                      <FormLabel>
                        {partnerType === "farmer" ? "Certifications (e.g., Organic, GAP)" : 
                         partnerType === "nutritionist" ? "Professional Certifications" : 
                         "Business Certifications"}
                      </FormLabel>
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

                    {/* Specializations */}
                    <div className="space-y-3">
                      <FormLabel>
                        {partnerType === "farmer" ? "Crops/Products" : 
                         partnerType === "nutritionist" ? "Specializations" : 
                         "Product Categories"}
                      </FormLabel>
                      <div className="flex gap-2">
                        <Input
                          value={specializationInput}
                          onChange={(e) => setSpecializationInput(e.target.value)}
                          placeholder={
                            partnerType === "farmer" ? "e.g., Organic vegetables" : 
                            partnerType === "nutritionist" ? "e.g., Weight management" : 
                            "e.g., Health foods"
                          }
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                        />
                        <Button type="button" onClick={addSpecialization} variant="outline">
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.getValues("specializations")?.map((spec, index) => (
                          <div key={index} className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            {spec}
                            <button
                              type="button"
                              onClick={() => removeSpecialization(index)}
                              className="text-secondary-foreground hover:text-secondary-foreground/70"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Suppliers (for retailers) */}
                    {partnerType === "retailer" && (
                      <div className="space-y-3">
                        <FormLabel>Current Suppliers</FormLabel>
                        <div className="flex gap-2">
                          <Input
                            value={supplierInput}
                            onChange={(e) => setSupplierInput(e.target.value)}
                            placeholder="Add current supplier"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSupplier())}
                          />
                          <Button type="button" onClick={addSupplier} variant="outline">
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {form.getValues("currentSuppliers")?.map((supplier, index) => (
                            <div key={index} className="bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
                              {supplier}
                              <button
                                type="button"
                                onClick={() => removeSupplier(index)}
                                className="text-accent-foreground hover:text-accent-foreground/70"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Target Market */}
                    <FormField
                      control={form.control}
                      name="targetMarket"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Market/Clientele</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your target market or ideal clients"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell us more about yourself and why you want to partner with ArogyaMix</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your story, goals, and how you align with our mission"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This helps us understand your motivation and how we can work together effectively.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Partnership Application"
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

export default PartnerOnboarding;