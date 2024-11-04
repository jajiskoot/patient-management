"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardBreadcrumb() {
  const pathname = usePathname();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Patients</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathname.includes('patient') ?
          (
            <BreadcrumbItem>
              <BreadcrumbPage>Add/Edit Patients</BreadcrumbPage>
            </BreadcrumbItem>
          )
          : (
            <BreadcrumbItem>
              <BreadcrumbPage>View Patients</BreadcrumbPage>
            </BreadcrumbItem>
          )
        }
      </BreadcrumbList>
    </Breadcrumb>
  );
}