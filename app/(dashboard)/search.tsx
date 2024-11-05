'use client';

import { useTransition } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    const value = formData.get('q') as string;
    const params = new URLSearchParams({ q: value });
    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  const ClearSearch = () => (
    <Button
      type='reset'
      variant='ghost'
      className='absolute right-0 top-0 bottom-0 flex items-center justify-center'
      onClick={() => router.replace('/')}
    >
      <X />
    </Button>
  )

  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      {isPending ? <Spinner /> : <ClearSearch />}
    </form>
  );
}
