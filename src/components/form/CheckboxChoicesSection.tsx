
import { Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CheckboxChoicesSectionProps {
  control: any;
  errors: any;
  watch: any;
  setValue: any;
  showOtherComment: boolean;
  setShowOtherComment: (value: boolean) => void;
}

const CheckboxChoicesSection = ({
  control,
  errors,
  watch,
  setValue,
  showOtherComment,
  setShowOtherComment,
}: CheckboxChoicesSectionProps) => {
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

  return (
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
  );
};

export default CheckboxChoicesSection;
