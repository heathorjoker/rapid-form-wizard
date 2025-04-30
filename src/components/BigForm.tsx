
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCustomerInfo, useSubmitForm } from "@/services/api";
import CustomerSection from "@/components/form/CustomerSection";
import PersonalInfoSection from "@/components/form/PersonalInfoSection";
import PreviousDetailsSection from "@/components/form/PreviousDetailsSection";
import SelectChoicesSection from "@/components/form/SelectChoicesSection";
import CheckboxChoicesSection from "@/components/form/CheckboxChoicesSection";
import DocumentsSection from "@/components/form/DocumentsSection";
import AdditionalInfoSection from "@/components/form/AdditionalInfoSection";
import FormActions from "@/components/form/FormActions";

// Define the validation schema using zod
const formSchema = z.object({
  customerId: z.string().min(3, "Customer ID must be at least 3 characters"),
  personalInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    dateOfBirth: z.date().optional(),
    socialSecurityNumber: z.string().optional(),
    occupation: z.string().optional(),
    employerName: z.string().optional(),
    nationality: z.string().optional(),
    taxId: z.string().optional(),
    maritalStatus: z.string().optional(),
    dependents: z.string().optional(),
  }),
  previousDetails: z.object({
    previousAddress1: z.string().optional(),
    previousAddress2: z.string().optional(),
    previousCity: z.string().optional(),
    previousFirstName: z.string().optional(),
    previousLastName: z.string().optional(),
  }),
  selectChoices: z.object({
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    product: z.string().min(1, "Product is required"),
    status: z.string().min(1, "Status is required"),
    priority: z.string().min(1, "Priority is required"),
    department: z.string().optional(),
    assignee: z.string().optional(),
    region: z.string().optional(),
    language: z.string().optional(),
    paymentMethod: z.string().optional(),
  }),
  checkboxChoices: z.object({
    options: z.array(z.string()).refine((value) => value.length > 0, {
      message: "At least one option must be selected",
    }),
    otherComment: z.string().optional(),
  }),
  docIds: z.array(
    z.object({
      docId: z.string().min(1, "Document ID is required"),
    })
  ),
  inflowDocIds: z.array(
    z.object({
      inflowDocId: z.string().min(1, "Inflow Document ID is required"),
    })
  ),
  additionalInfo: z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    notes: z.string().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const BigForm = () => {
  const [checkTriggered, setCheckTriggered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showOtherComment, setShowOtherComment] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        socialSecurityNumber: "",
        occupation: "",
        employerName: "",
        nationality: "",
        taxId: "",
        maritalStatus: "",
        dependents: "",
      },
      previousDetails: {
        previousAddress1: "",
        previousAddress2: "",
        previousCity: "",
        previousFirstName: "",
        previousLastName: "",
      },
      selectChoices: {
        category: "",
        subcategory: "",
        product: "",
        status: "",
        priority: "",
        department: "",
        assignee: "",
        region: "",
        language: "",
        paymentMethod: "",
      },
      checkboxChoices: {
        options: [],
        otherComment: "",
      },
      docIds: [],
      inflowDocIds: [],
      additionalInfo: {
        notes: "",
      },
    },
  });
  
  const { control, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = form;
  
  // React Query hooks
  const customerIdValue = watch("customerId");
  const customerInfoQuery = useCustomerInfo(customerIdValue, checkTriggered);
  const submitMutation = useSubmitForm();
  
  // Update personal info fields when customer data is fetched
  if (customerInfoQuery.data && checkTriggered) {
    const data = customerInfoQuery.data;
    Object.entries(data).forEach(([key, value]) => {
      setValue(`personalInfo.${key as keyof typeof data}`, value as string);
    });
    setCheckTriggered(false);
  }
  
  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);
    submitMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Form submitted successfully!");
        // Reset form or redirect as needed
      },
      onError: (error) => {
        toast.error(`Error submitting form: ${error}`);
      },
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Form Wizard Application</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <CustomerSection 
          control={control}
          errors={errors}
          watch={watch}
          setCheckTriggered={setCheckTriggered}
          customerInfoQuery={customerInfoQuery}
        />
        
        <PersonalInfoSection 
          control={control}
          errors={errors}
        />
        
        <PreviousDetailsSection 
          control={control}
        />
        
        <SelectChoicesSection 
          control={control}
          errors={errors}
          setValue={setValue}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <CheckboxChoicesSection 
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
          showOtherComment={showOtherComment}
          setShowOtherComment={setShowOtherComment}
        />
        
        <DocumentsSection 
          title="Document IDs"
          control={control}
          errors={errors}
          name="docIds"
          fieldName="docId"
          labelPrefix="Document"
        />
        
        <DocumentsSection 
          title="Inflow Document IDs"
          control={control}
          errors={errors}
          name="inflowDocIds"
          fieldName="inflowDocId"
          labelPrefix="Inflow Document"
        />
        
        <AdditionalInfoSection 
          control={control}
        />
        
        <FormActions 
          isSubmitting={isSubmitting}
          isPending={submitMutation.isPending}
          onReset={() => reset()}
        />
      </form>
    </div>
  );
};

export default BigForm;
