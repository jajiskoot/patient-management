import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { DocumentData } from 'firebase/firestore/lite';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { deletePatient } from './actions';
import { Address, Patient } from '@/types';
import { useRouter } from 'next/navigation';

export function PatientRow({ patient }: { patient: Patient }) {
  const router = useRouter();

  const stringifyAddresses = (addresses: Address[] | undefined) => {
    if (addresses) {
      const additionalAddresses = addresses.length > 1 ? `, ...+${addresses.length - 1}` : '';
      // TODO: add a prefered address field?
      return `${addresses[0].street}, ${addresses[0].city}, ${addresses[0].state}, ${addresses[0].zipcode}${additionalAddresses}`;
    }
    return 'None on File';
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {patient.dob.toDateString()}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {patient.status}
        </Badge>
      </TableCell>
      {/* TODO: update for multiple addresses */}
      <TableCell className="hidden md:table-cell">{stringifyAddresses(patient.address)}</TableCell>
      <TableCell>
        <Button variant='ghost' className='pl-0 mr-4' onClick={() => router.push(`/patient/${patient.id}`)}>
          <Edit />
        </Button>
        {/* TODO: create confirmation popup */}
        <Button variant='ghost' onClick={() => deletePatient(patient.id!)}><Trash /></Button>
      </TableCell>
    </TableRow>
  );
}
