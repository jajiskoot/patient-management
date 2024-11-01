import 'server-only';

import { getFirestore, collection, getDocs, DocumentData, Timestamp, setDoc, doc } from 'firebase/firestore/lite';

import { app } from '@/firebase';
import { Patient } from '@/types';

export const firestore = getFirestore(app);


export async function getPatients(
  search: string,
  offset: number
): Promise<{
  patients: Patient[];
  newOffset: number | null;
  totalPatients: number;
}> {

  // Always search the full table, not per page
  // if (search) {
  //   return {
  //     patients: await db
  //       .select()
  //       .from(patients)
  //       .where(ilike(patients.name, `%${search}%`))
  //       .limit(1000),
  //     newOffset: null,
  //     totalpatients: 0
  //   };
  // }

  // if (offset === null) {
  //   return { patients: [], newOffset: null, totalpatients: 0 };
  // }

  // let totalpatients = await db.select({ count: count() }).from(patients);
  // let morepatients = await db.select().from(patients).limit(5).offset(offset);
  // let newOffset = morepatients.length >= 5 ? offset + 5 : null;
  const patients: Patient[] = [];
  const snapshot = await getDocs(collection(firestore, 'patients'));
  snapshot.forEach((doc) => {
    const data = doc.data();
    const document: Record<string, T> = {};
    for (const key in data) {
      const value = data[key];
      if (value instanceof Timestamp) {
        document[key] = value.toDate().toDateString();
      } else {
        document[key] = value;
      }
    }

    patients.push(document as Patient);
  });

  return {
    patients: patients,
    newOffset: offset,
    totalPatients: snapshot.size
  };
}

export async function addPatient(data: Patient): Promise<{ message: string }> {
  // const cks = await cookies();
  // const tokens = await getTokens(cks, {
  //   apiKey: clientConfig.apiKey,
  //   cookieName: serverConfig.cookieName,
  //   cookieSignatureKeys: serverConfig.cookieSignatureKeys,
  //   serviceAccount: serverConfig.serviceAccount,
  // });

  // if (!tokens) {
  //   return {
  //     message: 'No valid token'
  //   };
  // }
  const docRef = doc(collection(firestore, "patients")); //automatically generate unique id

  await setDoc(docRef, data);

  return {
    message: 'Patient data added.'
  };
}

// export async function deletePatientById(id: number) {
//   await db.delete(patients).where(eq(patients.id, id));
// }
