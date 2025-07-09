import PlantSearch from '@/components/plant-search';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <Image
          src="https://placehold.co/1920x1080.png"
          data-ai-hint="botanical background"
          alt="Background illustration of various plants"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="container px-4 md:px-6 relative z-20">
          <div className="grid min-h-screen items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                  FloraFind
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  Your AI-powered guide to the botanical world. Search for plants by name, or scan them with your camera to unlock a wealth of information.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <PlantSearch />
                <p className="text-xs text-muted-foreground">
                  e.g., "Monstera Deliciosa", "Rose", "Quercus robur"
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Camera className="h-6 w-6 text-primary" />
                    Identify with a Photo
                  </CardTitle>
                  <CardDescription>
                    Can&apos;t recall the name? Use your device&apos;s camera to identify a plant and get detailed information instantly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/scan" passHref>
                    <Button size="lg" className="w-full">
                      <Camera className="mr-2 h-5 w-5" />
                      Scan a Plant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
