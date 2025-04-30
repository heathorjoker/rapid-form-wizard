
import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface PersonalInfoSectionProps {
  control: any;
  errors: any;
}

const PersonalInfoSection = ({
  control,
  errors,
}: PersonalInfoSectionProps) => {
  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  return (
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
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Controller
            name="personalInfo.dateOfBirth"
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
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
        <div>
          <Label htmlFor="ssn">Social Security Number</Label>
          <Controller
            name="personalInfo.socialSecurityNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="ssn"
                placeholder="SSN"
                className="w-full"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Controller
            name="personalInfo.occupation"
            control={control}
            render={({ field }) => (
              <Input
                id="occupation"
                placeholder="Occupation"
                className="w-full"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="employerName">Employer Name</Label>
          <Controller
            name="personalInfo.employerName"
            control={control}
            render={({ field }) => (
              <Input
                id="employerName"
                placeholder="Employer Name"
                className="w-full"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Controller
            name="personalInfo.nationality"
            control={control}
            render={({ field }) => (
              <Input
                id="nationality"
                placeholder="Nationality"
                className="w-full"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="taxId">Tax ID</Label>
          <Controller
            name="personalInfo.taxId"
            control={control}
            render={({ field }) => (
              <Input
                id="taxId"
                placeholder="Tax ID"
                className="w-full"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Controller
            name="personalInfo.maritalStatus"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  {maritalStatusOptions.map((option) => (
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
          <Label htmlFor="dependents">Number of Dependents</Label>
          <Controller
            name="personalInfo.dependents"
            control={control}
            render={({ field }) => (
              <Input
                id="dependents"
                type="number"
                placeholder="Dependents"
                className="w-full"
                {...field}
              />
            )}
          />
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfoSection;
