
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCustomerInfo } from "@/services/api";

interface CustomerSectionProps {
  control: any;
  errors: any;
  watch: any;
  setCheckTriggered: (value: boolean) => void;
  customerInfoQuery: ReturnType<typeof useCustomerInfo>;
}

const CustomerSection = ({
  control,
  errors,
  watch,
  setCheckTriggered,
  customerInfoQuery,
}: CustomerSectionProps) => {
  const customerIdValue = watch("customerId");

  // Handle check button for customer info
  const handleCheckCustomer = () => {
    setCheckTriggered(true);
  };

  return (
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
  );
};

export default CustomerSection;
