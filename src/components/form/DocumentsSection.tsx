
import { Controller, useFieldArray } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DocumentsSectionProps {
  title: string;
  control: any;
  errors: any;
  name: "docIds" | "inflowDocIds";
  fieldName: "docId" | "inflowDocId";
  labelPrefix: string;
}

const DocumentsSection = ({
  title,
  control,
  errors,
  name,
  fieldName,
  labelPrefix,
}: DocumentsSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Handle add document ID button
  const handleAddDoc = () => {
    if (fields.length < 5) {
      append({ [fieldName]: "" } as any);
    } else {
      toast.error(`Maximum of 5 ${labelPrefix.toLowerCase()}s allowed`);
    }
  };

  return (
    <Card className="form-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="form-section-title mb-0 pb-0 border-0">{title}</h2>
        <Button 
          type="button" 
          onClick={handleAddDoc} 
          disabled={fields.length >= 5}
          variant="outline"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" /> Add {labelPrefix}
        </Button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Add up to 5 {labelPrefix.toLowerCase()}s (all are required if added)
      </p>
      
      {fields.map((field, index) => (
        <div key={field.id} className="doc-field">
          <div className="flex-grow">
            <Label htmlFor={`${fieldName}-${index}`} className="required-field">{labelPrefix} {index + 1}</Label>
            <Controller
              name={`${name}.${index}.${fieldName}`}
              control={control}
              render={({ field }) => (
                <Input
                  id={`${fieldName}-${index}`}
                  placeholder={`Enter ${labelPrefix} ${index + 1}`}
                  className="w-full"
                  {...field}
                />
              )}
            />
            {errors[name]?.[index]?.[fieldName] && (
              <p className="text-sm text-red-500 mt-1">{errors[name][index][fieldName].message}</p>
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
        <p className="text-sm text-gray-400 italic">No {labelPrefix.toLowerCase()}s added yet</p>
      )}
    </Card>
  );
};

export default DocumentsSection;
