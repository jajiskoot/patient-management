"use server";

import { addPatient, updatePatient } from "@/lib/db";
import { Patient, PatientSchema } from "@/types";
import { ZodError } from "zod";

export async function submitPatient(values: Patient, patientId: string): Promise<{ error: ZodError<Patient> | undefined }> {
  const { data, error } = PatientSchema.safeParse(values);
  if (!error) {
    if (patientId) {
      updatePatient(data);
    } else {
      addPatient(data);
    }
  }
  return { error: error };
}