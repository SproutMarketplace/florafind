// src/app/plant/[name]/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { aggregatePlantData, AggregatePlantDataOutput } from '@/ai/flows/aggregate-plant-data';
import { generatePlantImage } from '@/ai/flows/generate-plant-image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, Leaf, BookOpen, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { withAuth } from '@/hooks/use-auth.tsx';

type PlantProfileProps = {
  params: {
    name: string;
  };
};

function PlantImage({ plantName }: { plantName: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        // For now, we'll just use a placeholder
        setImageUrl('https://placehold.co/600x600.png');
      } catch (error) {
        console.error('Failed to generate plant image:', error);
        // Fallback to a placeholder if image generation fails
        setImageUrl('https://placehold.co/600x600.png');
      }
    }
    fetchImage();
  }, [plantName]);

  if (!imageUrl) {
    return <Skeleton className="w-full aspect-square" />;
  }

  return (
    <Image
      src={imageUrl}
      alt={`Image of ${plantName}`}
      width={600}
      height={600}
      data-ai-hint="plant image"
      className="object-cover w-full aspect-square"
    />
  );
}


async function PlantData({ plantName }: { plantName: string }) {
  let data: AggregatePlantDataOutput;
  try {
    data = await aggregatePlantData({ plantName: decodeURIComponent(plantName) });
  } catch (error) {
    console.error('Failed to fetch plant data:', error);
    // Assuming error means not found for this app's purpose
    return notFound();
  }

  if (!data || !data.profile) {
    return notFound();
  }

  const decodedPlantName = decodeURIComponent(plantName);

  return (
    <div className="grid gap-8 lg:grid-cols-3 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-4xl capitalize text-primary">{decodedPlantName}</CardTitle>
            <CardDescription className="text-lg pt-2">{data.profile}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mt-4">
              <div className="space-y-3">
                <h3 className="text-xl font-headline flex items-center gap-2"><Leaf className="w-5 h-5 text-primary" />Species Characteristics</h3>
                <p className="text-foreground/80 leading-relaxed">{data.speciesCharacteristics}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-headline flex items-center gap-2"><Dna className="w-5 h-5 text-primary" />Genetic Data</h3>
                <p className="text-foreground/80 leading-relaxed">{data.geneticData}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Scientific Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.scientificArticles.map((article, index) => (
                <li key={index}>
                  <a href={article} target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:text-primary hover:underline flex items-start gap-2 transition-colors">
                    <LinkIcon className="w-4 h-4 mt-1 shrink-0" /> <span className="break-all">{article}</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><LinkIcon className="w-5 h-5 text-primary" />Botanical Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.botanicalResources.map((resource, index) => (
                <li key={index}>
                  <a href={resource} target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:text-primary hover:underline flex items-start gap-2 transition-colors">
                    <LinkIcon className="w-4 h-4 mt-1 shrink-0" /> <span className="break-all">{resource}</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 lg:sticky top-24">
        <Card className="shadow-lg overflow-hidden">
          <Suspense fallback={<Skeleton className="w-full aspect-square" />}>
            <PlantImage plantName={decodedPlantName} />
          </Suspense>
        </Card>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full mt-4" />
            <Skeleton className="h-6 w-5/6 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </CardContent>
        </Card>
      </div>
      <div className="lg:sticky top-24">
        <Card>
          <Skeleton className="w-full aspect-square" />
        </Card>
      </div>
    </div>
  );
}

function PlantProfilePage({ params }: PlantProfileProps) {
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
        <Suspense fallback={<LoadingSkeleton />}>
          <PlantData plantName={params.name} />
        </Suspense>
      </div>
    </main>
  );
}


export default withAuth(PlantProfilePage);
