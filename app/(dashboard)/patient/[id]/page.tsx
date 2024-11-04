import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientForm } from "../patient-form";
import { getPatient } from "@/lib/db";

export default async function EditPatient({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;

  const patient = await getPatient(id);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Patient</CardTitle>
        <CardDescription>Edit an existing patient.</CardDescription>
      </CardHeader>
      <CardContent>
        <PatientForm patient={patient} />
      </CardContent>
    </Card>
  )
}