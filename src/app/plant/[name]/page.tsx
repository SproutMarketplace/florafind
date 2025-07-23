
'use client';

import { Suspense, useEffect, useState } from 'react';
import type { AggregatePlantDataOutput } from '@/ai/flows/aggregate-plant-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, Leaf, BookOpen, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PlantProfileProps = {
  params: {
    name: string;
  };
};

function PlantImage({ plantName }: { plantName: string }) {
  return (
    <Image
      src="https://placehold.co/600x600.png"
      alt={`Image of ${plantName}`}
      data-ai-hint="plant image"
      width={600}
      height={600}
      className="object-cover w-full aspect-square"
    />
  );
}


function PlantData({ plantName }: { plantName: string }) {
  const decodedPlantName = decodeURIComponent(plantName);

  const mockData: AggregatePlantDataOutput = {
    profile: "The Monstera Deliciosa, often called the Swiss cheese plant, is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has become a popular houseplant for its iconic split leaves.",
    speciesCharacteristics: "Characterized by its large, glossy, heart-shaped leaves that develop splits or holes (fenestrations) as they mature. It's a climbing evergreen that can grow very large in its natural habitat.",
    geneticData: "As a member of the Araceae family, its genome reflects adaptations to low-light understory environments. Genetic markers are used to differentiate cultivars and study its unique leaf morphology development.",
    scientificArticles: [
      "https://pubmed.ncbi.nlm.nih.gov/33467409/",
      "https://www.nature.com/articles/s41598-021-88352-w",
      "https://www.sciencedirect.com/science/article/pii/S009884721931327X"
    ],
    botanicalResources: [
      "https://www.kew.org/plants/monstera-deliciosa",
      "https://en.wikipedia.org/wiki/Monstera_deliciosa",
      "https://plants.ces.ncsu.edu/plants/monstera-deliciosa/"
    ],
  };

  const data = mockData;

  if (!data || !data.profile) {
    return notFound();
  }

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
            <PlantImage plantName={decodedPlantName} />
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

export default function PlantProfilePage({ params }: PlantProfileProps) {
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
