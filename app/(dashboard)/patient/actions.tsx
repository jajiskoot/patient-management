"use server";

import { addPatient, updatePatient } from "@/lib/db";
import { Patient, PatientSchema } from "@/types";

export async function submitPatient(values: Patient, patientId: string) {
  const { data, error } = PatientSchema.safeParse(values);
  if (!error) {
    if (patientId) {
      updatePatient(data);
    } else {
      addPatient(data);
    }
  }
}