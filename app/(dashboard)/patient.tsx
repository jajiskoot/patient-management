import { MoreHorizontal } from 'lucide-react';
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

export function PatientRow({ patient }: { patient: Patient }) {
  const stringifyAddresses = (addresses: Address[] | undefined) => {
    if(addresses) {
      return addresses.map((value) => {
        return `${value.street}, ${value.city}, ${value.state} ${value.zipcode}`
      });
    }
    return 'None on File';
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {patient.dob}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {patient.status}
        </Badge>
      </TableCell>
      {/* TODO: update for multiple addresses */}
      <TableCell className="hidden md:table-cell">{stringifyAddresses(patient.address)}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deletePatient}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
