import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatientsTable } from './patients-table';
import { getPatients } from '@/lib/db';
import Link from 'next/link';
import { STATUS } from '@/types';

async function Patients({ search, offset, status }: { search: string, offset: string, status?: STATUS }) {
  const { patients, newOffset, totalPatients } = await getPatients(
    search,
    Number(offset),
    status
  );

  return (
    <PatientsTable
      patients={patients}
      offset={newOffset ?? 0}
      totalPatients={totalPatients}
    />
  )
}

export default async function PatientsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;


  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="Inquiry">Inquiry</TabsTrigger>
          <TabsTrigger value="Onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="Churned">Churned</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Link type='button' className="h-8 gap-1" href='/patient'>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Patient
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
        <Patients search={search} offset={offset} />
      </TabsContent>
      {Object.keys(STATUS).map((status) =>
        <TabsContent key={status} value={status}>
          <Patients search={search} offset={offset} status={STATUS[status as keyof typeof STATUS]} />
        </TabsContent>

      )}
    </Tabs>
  );
}
