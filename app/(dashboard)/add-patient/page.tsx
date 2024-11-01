import { z } from 'zod';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addPatient } from "@/lib/db";
import { STATES, PatientSchema } from "@/types";
import { PatientForm } from './patient-form';

export default function AddPatient() {

  // async function createPatientAction(formData: FormData) {
  //   // Potentially move to db.ts? Unlikely to use addPatient elsewhere
  //   "use server";
  //   const newPatient: Record<string, any> = {};
  //   for (const entry of formData.entries()) {
  //     if (!entry[0].includes('$')) { // Don't include $ACTION_ID
  //       // make more generic or solve with react-hook-form
  //       const [key1, key2, key3] = entry[0].split('.');
  //       if (key2) {
  //         // newPatient[key1] = { [key2]: entry[1], ...newPatient[key1] }
  //         if (newPatient[key1]) {
  //           if
  //           newPatient[key1][key2] = entry[1];

  //         } else {
  //           newPatient[key1] = [{ [key2]: entry[1] }]
  //         }
  //       } else {
  //         newPatient[key1] = entry[1];
  //       }
  //     }
  //   };
  //   newPatient['createdOn'] = Date.now();

  //   const { data, error } = PatientSchema.safeParse(newPatient);
  //   if (error) {
  //     // handle error
  //     console.error('failed validation' + error);
  //   } else {
  //     await addPatient(data);
  //   }
  // }

  const inputClassName = 'w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]';
  const selectClassName = `${inputClassName} border-2 py-2`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Patient</CardTitle>
        <CardDescription>Create a new patient.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: use react-hook-form?? */}
        <PatientForm />
        {/* <form action={createPatientAction} className="flex flex-col items-center w-full justify-between">
          <Input
            name="firstName"
            type="text"
            placeholder="First Name"
            maxLength={40}
            className={inputClassName}
          />
          <Input
            name="middleName"
            type="text"
            placeholder="Middle Name (Optional)"
            maxLength={80}
            className={inputClassName}
          />
          <Input
            name="lastName"
            type="text"
            placeholder="Last Name"
            // inline validation example
            required
            maxLength={80}
            className={inputClassName}
          />
          <select
            name="status"
            required
            defaultValue={'Status'}
            className={selectClassName}
          >
            <option value="Status">(Status)</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Active">Active</option>
            <option value="Churned">Churned</option>
          </select>
          Date of Birth
          <Input
            name="dob"
            type="date"
            required
            className={inputClassName}
          />
          <Input
            name="address.0.street"
            type="text"
            placeholder='Address Line 1'
            required
            className={inputClassName}
          />
          <Input
            name="address.0.city"
            type="text"
            placeholder='City'
            required
            className={inputClassName}
          />
          State/Territory
          <select
            name="address.0.state"
            className={selectClassName}
          >
            {STATES.map((state) => <option value={state}>{state}</option>)}
          </select>
          <Input
            name="address.0.zipcode"
            type="text"
            placeholder='Zipcode'
            required
            className={inputClassName}
          />

          <Button type="submit">Create Patient</Button>
        </form> */}
      </CardContent>
    </Card>
  )
}