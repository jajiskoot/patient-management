import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  setDoc,
  doc,
  getDoc,
  DocumentSnapshot,
  query,
  where,
  and,
  or,
  deleteDoc
} from 'firebase/firestore/lite';

import { app } from '@/firebase';
import { Patient, STATUS } from '@/types';

export const firestore = getFirestore(app);
const patientsCol = collection(firestore, 'patients');

function toPatient(doc: DocumentSnapshot) {
  const data = doc.data();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const document: Record<string, any> = { 'id': doc.id };
  for (const key in data) {
    const value = data[key];
    if (value instanceof Timestamp) {
      document[key] = value.toDate();
    } else {
      document[key] = value;
    }
  }
  return document as Patient;
}


export async function getPatient(
  id: string,
): Promise<Patient> {
  const snapshot = await getDoc(doc(patientsCol, id));
  return toPatient(snapshot);

}

export async function getPatients(
  search: string,
  offset: number,
  status?: STATUS
): Promise<{
  patients: Patient[];
  newOffset: number | null;
  totalPatients: number;
}> {

  let q = query(patientsCol);

  // Always search the full table, not per page
  if (search) {
    q = query(q,
      // TODO: search across all name fields simultaneously
      // potentially a full_name index?
      or(
        and(
          where("firstName", ">=", search),
          where("firstName", "<=", search + '~'),
        ),
        and(
          where("middleName", ">=", search),
          where("middleName", "<=", search + '~'),
        ),
        and(
          where("lastName", ">=", search),
          where("lastName", "<=", search + '~')
        ),
      )
    );
  }

  if (status) {
    q = query(q, where("status", "==", status));
  }

  // TODO: offset with pagination for firestore
  const patients: Patient[] = [];
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    patients.push(toPatient(doc));
  });

  return {
    patients: patients,
    newOffset: offset,
    totalPatients: snapshot.size
  };
}

export async function addPatient(data: Patient): Promise<{ message: string }> {

  const docRef = doc(collection(firestore, "patients")); //automatically generate unique id

  await setDoc(docRef, data);

  return {
    message: 'Patient data added.'
  };
}

// TODO: Worth modifying to send only changed fields instead of whole Patient?
export async function updatePatient(data: Patient) {
  const docRef = doc(patientsCol, data.id);

  await setDoc(docRef, data);

  return {
    message: 'Patient data updated successfully.'
  }
}

export async function deletePatientById(id: string) {
  await deleteDoc(doc(patientsCol, id));

}
