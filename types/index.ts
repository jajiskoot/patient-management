import { z } from "zod";

export enum STATUS {
  Inquiry = 'Inquiry',
  Onboarding = 'Onboarding',
  Active = 'Active',
  Churned = 'Churned',
}

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

const errorMessageTooShort = { message: ''};
const errorMessageTooLong = { message: 'Please input a valid value'};

const StatusSchema = z.nativeEnum(STATUS, errorMessageTooShort)

export const StateSchema = z.nativeEnum(STATES, errorMessageTooShort);


const AddressFormSchema = z.object({
  street: z.string().default(""),
  city: z.string().default(""),
  state: StateSchema.optional(),
  zipcode: z.string().default(""),
});

export const AddressSchema = z.object({
  street: z.string().min(2, errorMessageTooShort).max(80, errorMessageTooLong).regex(/\w+(\s\w+){2,}/),
  city: z.string().min(2, errorMessageTooShort).max(80, errorMessageTooLong),
  state: StateSchema,
  zipcode: z.string().min(5, errorMessageTooShort).max(5, errorMessageTooLong),
});

export const AdditionalFieldSchema = z.object({
  fieldName: z.string().default(""),
  value: z.string().default(""),
})

export const PatientFormSchema = z.object({
  id: z.string().optional(),
  createdOn: z.number().default(Date.now()),
  firstName: z.string().default(""),
  middleName: z.string().default(""),
  lastName: z.string().default(""),
  dob: z.date().optional(),
  status: StatusSchema.optional(),
  address: AddressFormSchema.array().default([AddressFormSchema.parse({})]),
  additionalFields: AdditionalFieldSchema.array().default([AdditionalFieldSchema.parse({})]),
})


export const PatientSchema = z.object({
  id: z.string().optional(),
  createdOn: z.number(),
  firstName: z.string().min(2, errorMessageTooShort).max(80, errorMessageTooLong),
  middleName: z.string().min(2, errorMessageTooShort).max(80, errorMessageTooLong),
  lastName: z.string().min(2, errorMessageTooShort).max(80, errorMessageTooLong),
  dob: z.date(errorMessageTooShort),
  status: StatusSchema,
  address: AddressSchema.array(),
  // remove additional fields with empty values
  additionalFields: AdditionalFieldSchema.array().transform(val => val.filter(entry => entry.fieldName)),
});

export type Address = z.infer<typeof AddressSchema>;
export type Patient = z.infer<typeof PatientSchema>;
