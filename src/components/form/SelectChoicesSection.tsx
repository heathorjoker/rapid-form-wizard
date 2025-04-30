
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCategoryOptions,
  useSubcategoryOptions,
  useProductOptions,
  useStatusOptions,
  usePriorityOptions,
} from "@/services/api";

interface SelectChoicesSectionProps {
  control: any;
  errors: any;
  setValue: any;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const SelectChoicesSection = ({
  control,
  errors,
  setValue,
  selectedCategory,
  setSelectedCategory,
}: SelectChoicesSectionProps) => {
  // React Query hooks
  const categoryOptions = useCategoryOptions();
  const subcategoryOptions = useSubcategoryOptions(selectedCategory);
  const productOptions = useProductOptions();
  const statusOptions = useStatusOptions();
  const priorityOptions = usePriorityOptions();

  // Mock options for select fields
  const departmentOptions = [
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "support", label: "Support" },
    { value: "engineering", label: "Engineering" },
    { value: "finance", label: "Finance" },
  ];
  
  const assigneeOptions = [
    { value: "john", label: "John Doe" },
    { value: "jane", label: "Jane Smith" },
    { value: "bob", label: "Bob Johnson" },
    { value: "alice", label: "Alice Williams" },
  ];
  
  const regionOptions = [
    { value: "na", label: "North America" },
    { value: "eu", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "sa", label: "South America" },
    { value: "af", label: "Africa" },
  ];
  
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
  ];
  
  const paymentMethodOptions = [
    { value: "cc", label: "Credit Card" },
    { value: "bank", label: "Bank Transfer" },
    { value: "paypal", label: "PayPal" },
    { value: "crypto", label: "Cryptocurrency" },
  ];

  return (
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
        <div>
          <Label htmlFor="department">Department</Label>
          <Controller
            name="selectChoices.department"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="assignee">Assignee</Label>
          <Controller
            name="selectChoices.assignee"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {assigneeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="region">Region</Label>
          <Controller
            name="selectChoices.region"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Controller
            name="selectChoices.language"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Controller
            name="selectChoices.paymentMethod"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethodOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </Card>
  );
};

export default SelectChoicesSection;
