'use server';

import { deletePatientById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deletePatient(id: string) {
  await deletePatientById(id);
  revalidatePath('/');
}
