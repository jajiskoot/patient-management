import { z } from "zod";

export enum STATUS {
  Inquiry = 'Inquiry',
  Onboarding = 'Onboarding',
  Active = 'Active',
  Churned = 'Churned',
}

const StatusSchema = z.nativeEnum(STATUS).default(STATUS.Inquiry)

export enum STATES {
  AL = 'AL',
  AK = 'AK',
  AS = 'AS',
  AZ = 'AZ',
  AR = 'AR',
  CA = 'CA',
  CO = 'CO',
  CT = 'CT',
  DE = 'DE',
  DC = 'DC',
  FM = 'FM',
  FL = 'FL',
  GA = 'GA',
  GU = 'GU',
  HI = 'HI',
  ID = 'ID',
  IL = 'IL',
  IN = 'IN',
  IA = 'IA',
  KS = 'KS',
  KY = 'KY',
  LA = 'LA',
  ME = 'ME',
  MH = 'MH',
  MD = 'MD',
  MA = 'MA',
  MI = 'MI',
  MN = 'MN',
  MS = 'MS',
  MO = 'MO',
  MT = 'MT',
  NE = 'NE',
  NV = 'NV',
  NH = 'NH',
  NJ = 'NJ',
  NM = 'NM',
  NY = 'NY',
  NC = 'NC',
  ND = 'ND',
  MP = 'MP',
  OH = 'OH',
  OK = 'OK',
  OR = 'OR',
  PW = 'PW',
  PA = 'PA',
  PR = 'PR',
  RI = 'RI',
  SC = 'SC',
  SD = 'SD',
  TN = 'TN',
  TX = 'TX',
  UT = 'UT',
  VT = 'VT',
  VI = 'VI',
  VA = 'VA',
  WA = 'WA',
  WV = 'WV',
  WI = 'WI',
  WY = 'WY'
}

export const StateSchema = z.nativeEnum(STATES).default(STATES.AL);

const ZipcodeSchema = z.string().max(5).min(5).default("12345");

export const AddressSchema = z.object({
  street: z.string().default(""),
  city: z.string().default(""),
  state: StateSchema,
  zipcode: ZipcodeSchema,
});

export const AdditionalFieldSchema = z.object({
  fieldName: z.string().default(""),
  value: z.string().default(""),
})

export const PatientSchema = z.object({
  id: z.string().optional(),
  createdOn: z.number().default(Date.now()),
  firstName: z.string().default(""),
  middleName: z.string().default(""),
  lastName: z.string().default(""),
  dob: z.date().default(new Date('1987-04-03')),
  status: StatusSchema,
  address: AddressSchema.array().default([AddressSchema.parse({})]),
  additionalFields: AdditionalFieldSchema.array().default([AdditionalFieldSchema.parse({})]),
});

export type Address = z.infer<typeof AddressSchema>;
export type Patient = z.infer<typeof PatientSchema>;
