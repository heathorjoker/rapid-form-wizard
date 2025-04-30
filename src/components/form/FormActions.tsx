
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
  isPending: boolean;
  onReset: () => void;
}

const FormActions = ({ isSubmitting, isPending, onReset }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
      >
        Reset Form
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting || isPending}
      >
        {(isSubmitting || isPending) ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : "Submit Form"}
      </Button>
    </div>
  );
};

export default FormActions;
