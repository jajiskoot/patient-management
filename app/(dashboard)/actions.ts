'use server';

// import { deletePatientById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deletePatient(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deletePatientById(id);
  // revalidatePath('/');
}
