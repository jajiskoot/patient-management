"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { AdditionalFieldSchema, AddressSchema, Patient, PatientFormSchema, PatientSchema, STATES, STATUS } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitPatient } from "./actions";

export function PatientForm({ patient }: { patient?: Patient }) {
  const form = useForm<Patient>({
    resolver: zodResolver(PatientSchema),
    defaultValues: patient ?? PatientFormSchema.parse({})
  })

  const { fields: addressFields, append: addAddressField } = useFieldArray({ name: "address", control: form.control });

  const { fields: additionalFields, append: addField } = useFieldArray({ name: "additionalFields", control: form.control });

  const router = useRouter();

  async function onSubmit(values: Patient) {
    const patientId = patient?.id ?? "";
    const { error } = await submitPatient(values, patientId);
    if (!error) {
      router.push('/');
    }
  }



  return (
    // TODO: Separate out fields onto separate pages? i.e. Don't show too many fields on one page
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row space-x-16">

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              // TODO: make generic function for reuse
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jacob" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jingleheimer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col py-1 mr-10">
                <FormLabel className="mb-2">Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-48">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(STATUS).map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {addressFields.map((_field, index) => (
          <div key={index} className="mb-8 border-2 rounded-md p-2 space-y-4">
            <div className="mb-4 font-bold">Address {index + 1}</div>
            <FormField
              control={form.control}
              name={`address.${index}.street`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Forest Ave" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`address.${index}.city`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Orlando" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`address.${index}.state`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State or U.S. Territory</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state/territory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(STATES).map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`address.${index}.zipcode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button type="button" onClick={() => addAddressField(AddressSchema.parse({}))}>
          Add Address
        </Button>
        <div>
          {additionalFields.map((_field, index) => (
            <div key={index} className="flex flex-row mb-8 border-2 rounded-md p-2">
              <FormField
                control={form.control}
                name={`additionalFields.${index}.fieldName`}
                render={({ field }) => (
                  <FormItem className="mr-8">
                    <FormLabel>Additional Field</FormLabel>
                    <FormDescription>This field gives the new value a name ex: Phone Number</FormDescription>
                    <FormControl>
                      <Input placeholder="Field Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`additionalFields.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormDescription>ex: 407-123-4567</FormDescription>
                    <FormControl>
                      <Input placeholder="Value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button type="button" onClick={() => addField(AdditionalFieldSchema.parse({}))}>
            Add Field
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
