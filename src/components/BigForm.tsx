
import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, Loader2, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  useCustomerInfo,
  useCategoryOptions,
  useSubcategoryOptions,
  useProductOptions,
  useStatusOptions,
  usePriorityOptions,
  useSubmitForm,
} from "@/services/api";

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
  }),
  selectChoices: z.object({
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    product: z.string().min(1, "Product is required"),
    status: z.string().min(1, "Status is required"),
    priority: z.string().min(1, "Priority is required"),
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
      },
      selectChoices: {
        category: "",
        subcategory: "",
        product: "",
        status: "",
        priority: "",
      },
      checkboxChoices: {
        options: [],
        otherComment: "",
      },
      docIds: [],
      additionalInfo: {
        notes: "",
      },
    },
  });
  
  const { control, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = form;
  
  // React Query hooks
  const customerIdValue = watch("customerId");
  const customerInfoQuery = useCustomerInfo(customerIdValue, checkTriggered);
  const categoryOptions = useCategoryOptions();
  const subcategoryOptions = useSubcategoryOptions(selectedCategory);
  const productOptions = useProductOptions();
  const statusOptions = useStatusOptions();
  const priorityOptions = usePriorityOptions();
  const submitMutation = useSubmitForm();
  
  // Field array for dynamic document IDs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "docIds",
  });
  
  // Handle check button for customer info
  const handleCheckCustomer = () => {
    setCheckTriggered(true);
  };
  
  // Update personal info fields when customer data is fetched
  if (customerInfoQuery.data && checkTriggered) {
    const data = customerInfoQuery.data;
    Object.entries(data).forEach(([key, value]) => {
      setValue(`personalInfo.${key as keyof typeof data}`, value as string);
    });
    setCheckTriggered(false);
  }
  
  // Handle checkbox changes
  const handleCheckboxChange = (value: string) => {
    const currentOptions = watch("checkboxChoices.options");
    const isSelected = currentOptions.includes(value);
    
    let updatedOptions;
    if (isSelected) {
      updatedOptions = currentOptions.filter((option) => option !== value);
    } else {
      updatedOptions = [...currentOptions, value];
    }
    
    setValue("checkboxChoices.options", updatedOptions);
    
    // Handle "Other" checkbox specially
    if (value === "other") {
      setShowOtherComment(!isSelected);
      if (isSelected) {
        setValue("checkboxChoices.otherComment", "");
      }
    }
  };
  
  // Handle add document ID button
  const handleAddDocId = () => {
    if (fields.length < 5) {
      append({ docId: "" });
    } else {
      toast.error("Maximum of 5 document IDs allowed");
    }
  };
  
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
        {/* Customer ID Section */}
        <Card className="form-section">
          <h2 className="form-section-title">Customer Identification</h2>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-grow">
              <Label htmlFor="customerId" className="required-field">Customer ID</Label>
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <Input
                    id="customerId"
                    placeholder="Enter customer ID"
                    className="w-full"
                    {...field}
                    disabled={customerInfoQuery.isLoading}
                  />
                )}
              />
              {errors.customerId && (
                <p className="text-sm text-red-500 mt-1">{errors.customerId.message}</p>
              )}
            </div>
            <Button 
              type="button"
              onClick={handleCheckCustomer}
              disabled={!customerIdValue || customerIdValue.length < 3 || customerInfoQuery.isLoading}
              className="mt-8"
            >
              {customerInfoQuery.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : "Check"}
            </Button>
          </div>
          {customerInfoQuery.isError && (
            <p className="text-sm text-red-500 mt-2">
              Error retrieving customer information: {customerInfoQuery.error.message}
            </p>
          )}
        </Card>
        
        {/* Personal Information Section */}
        <Card className="form-section">
          <h2 className="form-section-title">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="required-field">First Name</Label>
              <Controller
                name="personalInfo.firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    className="w-full"
                    {...field}
                  />
                )}
              />
              {errors.personalInfo?.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.personalInfo.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName" className="required-field">Last Name</Label>
              <Controller
                name="personalInfo.lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    className="w-full"
                    {...field}
                  />
                )}
              />
              {errors.personalInfo?.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.personalInfo.lastName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="required-field">Email Address</Label>
              <Controller
                name="personalInfo.email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    {...field}
                  />
                )}
              />
              {errors.personalInfo?.email && (
                <p className="text-sm text-red-500 mt-1">{errors.personalInfo.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className="required-field">Phone Number</Label>
              <Controller
                name="personalInfo.phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    placeholder="Phone Number"
                    className="w-full"
                    {...field}
                  />
                )}
              />
              {errors.personalInfo?.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.personalInfo.phone.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="address" className="required-field">Address</Label>
              <Controller
                name="personalInfo.address"
                control={control}
                render={({ field }) => (
                  <Input
                    id="address"
                    placeholder="Address"
                    className="w-full"
                    {...field}
                  />
                )}
              />
              {errors.personalInfo?.address && (
                <p className="text-sm text-red-500 mt-1">{errors.personalInfo.address.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="city" className="required-field">City</Label>
              <Controller
                name="personalInfo.city"
                control={control}
                render={({ field }) => (
                  <Input
                    id="city"
                    placeholder="City"
                    className="w-full"
                    {...field}
                  />
                )}
              />
              {errors.personalInfo?.city && (
                <p className="text-sm text-red-500 mt-1">{errors.personalInfo.city.message}</p>
              )}
            </div>
          </div>
        </Card>
        
        {/* Select Choices Section */}
        <Card className="form-section">
          <h2 className="form-section-title">Select Choices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="category" className="required-field">Category</Label>
              <Controller
                name="selectChoices.category"
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={categoryOptions.isLoading}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCategory(value);
                      // Reset subcategory when category changes
                      setValue("selectChoices.subcategory", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.isLoading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : categoryOptions.data?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectChoices?.category && (
                <p className="text-sm text-red-500 mt-1">{errors.selectChoices.category.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="subcategory" className="required-field">Subcategory</Label>
              <Controller
                name="selectChoices.subcategory"
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={!selectedCategory || subcategoryOptions.isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategoryOptions.isLoading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : subcategoryOptions.data?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectChoices?.subcategory && (
                <p className="text-sm text-red-500 mt-1">{errors.selectChoices.subcategory.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="product" className="required-field">Product</Label>
              <Controller
                name="selectChoices.product"
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={productOptions.isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.isLoading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : productOptions.data?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectChoices?.product && (
                <p className="text-sm text-red-500 mt-1">{errors.selectChoices.product.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="status" className="required-field">Status</Label>
              <Controller
                name="selectChoices.status"
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={statusOptions.isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.isLoading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : statusOptions.data?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectChoices?.status && (
                <p className="text-sm text-red-500 mt-1">{errors.selectChoices.status.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="priority" className="required-field">Priority</Label>
              <Controller
                name="selectChoices.priority"
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={priorityOptions.isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.isLoading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : priorityOptions.data?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectChoices?.priority && (
                <p className="text-sm text-red-500 mt-1">{errors.selectChoices.priority.message}</p>
              )}
            </div>
          </div>
        </Card>
        
        {/* Checkbox Choices Section */}
        <Card className="form-section">
          <h2 className="form-section-title">Checkbox Choices</h2>
          <p className="text-sm text-gray-500 mb-4">Select at least one option</p>
          
          <div className="checkbox-grid mb-4">
            {["Feature Request", "Bug Report", "Account Issue", "Billing Question", 
              "Technical Support", "Product Inquiry", "Service Complaint", 
              "Feedback", "Documentation", "other"].map((option) => {
              const optionValue = option.toLowerCase().replace(/\s/g, "-");
              return (
                <div className="flex items-start space-x-2" key={optionValue}>
                  <Checkbox
                    id={optionValue}
                    checked={watch("checkboxChoices.options").includes(optionValue)}
                    onCheckedChange={() => handleCheckboxChange(optionValue)}
                  />
                  <Label 
                    htmlFor={optionValue}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
          
          {showOtherComment && (
            <div className="mt-4">
              <Label htmlFor="otherComment">Other Comments</Label>
              <Controller
                name="checkboxChoices.otherComment"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="otherComment"
                    placeholder="Please specify..."
                    className="w-full"
                    {...field}
                  />
                )}
              />
            </div>
          )}
          
          {errors.checkboxChoices?.options && (
            <p className="text-sm text-red-500 mt-2">{errors.checkboxChoices.options.message}</p>
          )}
        </Card>
        
        {/* Document ID Section */}
        <Card className="form-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="form-section-title mb-0 pb-0 border-0">Document IDs</h2>
            <Button 
              type="button" 
              onClick={handleAddDocId} 
              disabled={fields.length >= 5}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Document
            </Button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Add up to 5 document IDs (all are required if added)
          </p>
          
          {fields.map((field, index) => (
            <div key={field.id} className="doc-field">
              <div className="flex-grow">
                <Label htmlFor={`docId-${index}`} className="required-field">Document ID {index + 1}</Label>
                <Controller
                  name={`docIds.${index}.docId`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id={`docId-${index}`}
                      placeholder={`Enter Document ID ${index + 1}`}
                      className="w-full"
                      {...field}
                    />
                  )}
                />
                {errors.docIds?.[index]?.docId && (
                  <p className="text-sm text-red-500 mt-1">{errors.docIds[index]?.docId?.message}</p>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-8"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {fields.length === 0 && (
            <p className="text-sm text-gray-400 italic">No document IDs added yet</p>
          )}
        </Card>
        
        {/* Additional Information Section */}
        <Card className="form-section">
          <h2 className="form-section-title">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Controller
                name="additionalInfo.startDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Controller
                name="additionalInfo.endDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Controller
              name="additionalInfo.notes"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="notes"
                  placeholder="Enter any additional notes or comments"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </div>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset Form
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || submitMutation.isPending}
          >
            {(isSubmitting || submitMutation.isPending) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : "Submit Form"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BigForm;
