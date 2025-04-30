
import { useQuery, useMutation } from "@tanstack/react-query";

// Mock API functions that would be replaced with real API calls
const fetchCustomerInfo = async (customerId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mock response - in a real app, this would come from the API
  if (!customerId || customerId.length < 3) {
    throw new Error("Invalid customer ID");
  }
  
  return {
    firstName: `John-${customerId}`,
    lastName: "Doe",
    email: `john.doe${customerId}@example.com`,
    phone: `555-123-${customerId}`,
    address: "123 Main St",
    city: "Anytown",
    // Additional mock fields
    occupation: "Software Developer",
    employerName: "Tech Corp",
    nationality: "USA",
    socialSecurityNumber: "XXX-XX-" + customerId,
    taxId: "TID-" + customerId,
    maritalStatus: "single",
    dependents: "2",
    // Date of birth not included as it's a Date object and would need special handling
  };
};

const fetchCategoryOptions = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  return [
    { value: "cat1", label: "Category 1" },
    { value: "cat2", label: "Category 2" },
    { value: "cat3", label: "Category 3" },
    { value: "cat4", label: "Category 4" },
  ];
};

const fetchSubcategoryOptions = async (categoryId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Different subcategories based on selected category
  const subcategories: Record<string, {value: string, label: string}[]> = {
    cat1: [
      { value: "subcat1_1", label: "Subcategory 1.1" },
      { value: "subcat1_2", label: "Subcategory 1.2" },
    ],
    cat2: [
      { value: "subcat2_1", label: "Subcategory 2.1" },
      { value: "subcat2_2", label: "Subcategory 2.2" },
      { value: "subcat2_3", label: "Subcategory 2.3" },
    ],
    cat3: [
      { value: "subcat3_1", label: "Subcategory 3.1" },
    ],
    cat4: [
      { value: "subcat4_1", label: "Subcategory 4.1" },
      { value: "subcat4_2", label: "Subcategory 4.2" },
    ],
  };
  
  return subcategories[categoryId] || [];
};

const fetchProductOptions = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  return [
    { value: "prod1", label: "Product 1" },
    { value: "prod2", label: "Product 2" },
    { value: "prod3", label: "Product 3" },
  ];
};

const fetchStatusOptions = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];
};

const fetchPriorityOptions = async () => {
  return [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
};

// Submit form data
const submitFormData = async (data: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  console.log("Form submitted with data:", data);
  return { success: true, message: "Form submitted successfully!" };
};

// Custom hooks using React Query
export const useCustomerInfo = (customerId: string, enabled = false) => {
  return useQuery({
    queryKey: ["customerInfo", customerId],
    queryFn: () => fetchCustomerInfo(customerId),
    enabled: enabled && !!customerId,
  });
};

export const useCategoryOptions = () => {
  return useQuery({
    queryKey: ["categoryOptions"],
    queryFn: fetchCategoryOptions,
  });
};

export const useSubcategoryOptions = (categoryId: string) => {
  return useQuery({
    queryKey: ["subcategoryOptions", categoryId],
    queryFn: () => fetchSubcategoryOptions(categoryId),
    enabled: !!categoryId,
  });
};

export const useProductOptions = () => {
  return useQuery({
    queryKey: ["productOptions"],
    queryFn: fetchProductOptions,
  });
};

export const useStatusOptions = () => {
  return useQuery({
    queryKey: ["statusOptions"],
    queryFn: fetchStatusOptions,
  });
};

export const usePriorityOptions = () => {
  return useQuery({
    queryKey: ["priorityOptions"],
    queryFn: fetchPriorityOptions,
  });
};

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: submitFormData,
  });
};
