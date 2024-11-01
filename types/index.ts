import { z } from "zod";

const StatusSchema = z.union([
  z.literal('Inquiry'),
  z.literal('Onboarding'),
  z.literal('Active'),
  z.literal('Churned')
])

export const STATES = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

// TODO: worth effort to map? https://github.com/colinhacks/zod/issues/831
export const StateSchema = z.union([
  z.literal('AL'),
  z.literal('AK'),
  z.literal('AS'),
  z.literal('AZ'),
  z.literal('AR'),
  z.literal('CA'),
  z.literal('CO'),
  z.literal('CT'),
  z.literal('DE'),
  z.literal('DC'),
  z.literal('FM'),
  z.literal('FL'),
  z.literal('GA'),
  z.literal('GU'),
  z.literal('HI'),
  z.literal('ID'),
  z.literal('IL'),
  z.literal('IN'),
  z.literal('IA'),
  z.literal('KS'),
  z.literal('KY'),
  z.literal('LA'),
  z.literal('ME'),
  z.literal('MH'),
  z.literal('MD'),
  z.literal('MA'),
  z.literal('MI'),
  z.literal('MN'),
  z.literal('MS'),
  z.literal('MO'),
  z.literal('MT'),
  z.literal('NE'),
  z.literal('NV'),
  z.literal('NH'),
  z.literal('NJ'),
  z.literal('NM'),
  z.literal('NY'),
  z.literal('NC'),
  z.literal('ND'),
  z.literal('MP'),
  z.literal('OH'),
  z.literal('OK'),
  z.literal('OR'),
  z.literal('PW'),
  z.literal('PA'),
  z.literal('PR'),
  z.literal('RI'),
  z.literal('SC'),
  z.literal('SD'),
  z.literal('TN'),
  z.literal('TX'),
  z.literal('UT'),
  z.literal('VT'),
  z.literal('VI'),
  z.literal('VA'),
  z.literal('WA'),
  z.literal('WV'),
  z.literal('WI'),
  z.literal('WY')
]);

const ZipcodeSchema = z.string().max(5).min(5);

export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: StateSchema,
  zipcode: ZipcodeSchema,
});
export const PatientSchema = z.object({
  createdOn: z.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dob: z.date(),
  status: StatusSchema,
  address: AddressSchema.array(),
  additionalFields: z.object({}).catchall(z.union([z.string(), z.number()])).optional()
});

export type Patient = z.infer<typeof PatientSchema>;
