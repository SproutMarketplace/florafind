'use client';

import PlantScanner from '@/components/plant-scanner';
import { Button } from '@/components/ui/button';
import { withAuth } from '@/hooks/use-auth.tsx';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ScanPage() {
    return (
        <main className="flex-1 py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
                <div className="mb-8">
                    <Button variant="outline" asChild>
                      <Link href="/">
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                      </Link>
                    </Button>
                </div>
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-primary mb-2">
                        Plant Scanner
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-lg mb-8">
                        Upload or take a photo of a plant to identify it and learn more.
                    </p>
                    <PlantScanner />
                </div>
            </div>
        </main>
    );
}

export default withAuth(ScanPage);
