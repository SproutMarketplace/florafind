

import { Suspense } from 'react';
import type { AggregatePlantDataOutput } from '@/ai/flows/aggregate-plant-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, Leaf, BookOpen, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type PlantProfileProps = {
  params: {
    name: string;
  };
};

function PlantImage({ plantName }: { plantName: string }) {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96">
      <Image
        src="https://placehold.co/1200x400.png"
        alt={`Image of ${plantName}`}
        data-ai-hint="plant image"
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
      />
    </div>
  );
}


function PlantData({ plantName }: { plantName: string }) {
  const decodedPlantName = decodeURIComponent(plantName);

  const mockData: AggregatePlantDataOutput & { family: string } = {
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
    family: 'Araceae',
  };

  const data = mockData;

  if (!data || !data.profile) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <Card className="shadow-lg overflow-hidden">
        <PlantImage plantName={decodedPlantName} />
        <CardHeader>
          <CardTitle className="font-headline text-4xl capitalize text-primary">{decodedPlantName}</CardTitle>
          <CardDescription className="text-lg pt-2">{data.profile}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                    {data.family}
                </Badge>
            </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">
            <BookOpen className="mr-2 h-4 w-4" />
            Scientific Articles
          </TabsTrigger>
          <TabsTrigger value="resources">
            <LinkIcon className="mr-2 h-4 w-4" />
            Botanical Resources
          </TabsTrigger>
          <TabsTrigger value="data">
            <Dna className="mr-2 h-4 w-4" />
            Genetic Data
          </TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
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
        </TabsContent>
        <TabsContent value="resources">
          <Card className="shadow-lg">
             <CardContent className="pt-6">
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
        </TabsContent>
        <TabsContent value="data">
          <Card className="shadow-lg">
            <CardContent className="pt-6 space-y-6">
                <div className="space-y-3">
                    <h3 className="text-xl font-headline flex items-center gap-2"><Dna className="w-5 h-5 text-primary" />Genetic Data</h3>
                    <p className="text-foreground/80 leading-relaxed">{data.geneticData}</p>
                </div>
                <div className="space-y-3">
                    <h3 className="text-xl font-headline flex items-center gap-2"><Leaf className="w-5 h-5 text-primary" />Species Characteristics</h3>
                    <p className="text-foreground/80 leading-relaxed">{data.speciesCharacteristics}</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <Skeleton className="h-80 w-full rounded-t-lg" />
        <CardHeader>
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-full mt-4" />
          <Skeleton className="h-6 w-5/6 mt-2" />
        </CardHeader>
        <CardContent>
           <Skeleton className="h-8 w-24" />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Card>
            <CardContent className="pt-6 space-y-4">
                 <Skeleton className="h-5 w-full" />
                 <Skeleton className="h-5 w-full" />
                 <Skeleton className="h-5 w-5/6" />
            </CardContent>
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
