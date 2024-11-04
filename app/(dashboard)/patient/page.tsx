import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientForm } from './patient-form';

export default function AddPatient() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Patient</CardTitle>
        <CardDescription>Create a new patient.</CardDescription>
      </CardHeader>
      <CardContent>
        <PatientForm />
      </CardContent>
    </Card>
  )
}