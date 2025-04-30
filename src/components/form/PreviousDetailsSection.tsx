
import { Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PreviousDetailsSectionProps {
  control: any;
}

const PreviousDetailsSection = ({ control }: PreviousDetailsSectionProps) => {
  return (
    <Card className="form-section">
      <h2 className="form-section-title">Previous Details</h2>
      <div className="space-y-6">
        <h3 className="text-md font-medium">Previous Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="previousAddress1">Previous Address Line 1</Label>
            <Controller
              name="previousDetails.previousAddress1"
              control={control}
              render={({ field }) => (
                <Input
                  id="previousAddress1"
                  placeholder="Previous Address Line 1"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="previousAddress2">Previous Address Line 2</Label>
            <Controller
              name="previousDetails.previousAddress2"
              control={control}
              render={({ field }) => (
                <Input
                  id="previousAddress2"
                  placeholder="Previous Address Line 2"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="previousCity">Previous City</Label>
            <Controller
              name="previousDetails.previousCity"
              control={control}
              render={({ field }) => (
                <Input
                  id="previousCity"
                  placeholder="Previous City"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <h3 className="text-md font-medium">Previous Name</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="previousFirstName">Previous First Name</Label>
            <Controller
              name="previousDetails.previousFirstName"
              control={control}
              render={({ field }) => (
                <Input
                  id="previousFirstName"
                  placeholder="Previous First Name"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="previousLastName">Previous Last Name</Label>
            <Controller
              name="previousDetails.previousLastName"
              control={control}
              render={({ field }) => (
                <Input
                  id="previousLastName"
                  placeholder="Previous Last Name"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PreviousDetailsSection;
