import { collection, doc, writeBatch } from "firebase/firestore/lite";
import { firestore } from "@/lib/db";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/config";


export async function GET() {
  
  const cks = await cookies();
  const tokens = await getTokens(cks, {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    return Response.json({
      message: 'No valid token'
    });
  }
  const batch = writeBatch(firestore);

  [
    {
      firstName: 'Sean',
      middleName: 'Andrew',
      lastName: 'Smith',
      dob: new Date('1994-11-27'),
      status: 'Active',
      address: [{
        street: '215 Turnpoint Ave',
        city: 'Orlando',
        state: 'FL',
        zipcode: '32812'
      }],
      daysActive: 150
    },
    {
      firstName: 'James',
      middleName: 'Jingle',
      lastName: 'Johnson',
      dob: new Date('1986-02-15'),
      status: 'Inquiry',
      daysActive: 150,
    },
    {
      firstName: 'Nissan',
      middleName: 'Andrew',
      lastName: 'Smith',
      dob: new Date('1994-09-25'),
      status: 'Onboarding',
      daysActive: 150,
    },
    {
      firstName: 'Hugh',
      middleName: 'Jack',
      lastName: 'Man',
      dob: new Date('1972-12-03'),
      status: 'Active',
      daysActive: 150,
    },
    {
      firstName: 'Paul',
      middleName: 'Christian',
      lastName: 'Rudolph',
      dob: new Date('1963-05-21'),
      status: 'Active',
      daysActive: 150,
    },
    {
      firstName: 'Lisa',
      middleName: 'Katie',
      lastName: 'Solderholm',
      dob: new Date('1951-01-13'),
      status: 'Churned',
      daysActive: 150,
    },
    {
      firstName: 'Jackie',
      middleName: 'Wynona',
      lastName: 'Ryder',
      dob: new Date('1981-04-06'),
      status: 'Active',
      daysActive: 150,
    }
  ].forEach((obj) => {
    const docRef = doc(collection(firestore, "patients")); //automatically generate unique id
    batch.set(docRef, obj);
  });

  await batch.commit();

  return Response.json({
    message: 'Firestore data seeded.'
  });
}
