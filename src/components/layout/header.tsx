import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              FloraFind
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-2">
           <Button variant="ghost" asChild>
              <Link href="/#">Search</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/scan">Scan</Link>
            </Button>
        </nav>
      </div>
    </header>
  );
}
