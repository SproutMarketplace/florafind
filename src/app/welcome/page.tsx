
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Search, Camera, Dna, Leaf } from 'lucide-react';
import Image from 'next/image';

const welcomeSteps = [
  {
    icon: Leaf,
    title: 'Welcome to FloraFind',
    description: 'Your AI-powered guide to the botanical world. Discover the secrets of plants around you.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'lush forest',
  },
  {
    icon: Search,
    title: 'Search and Discover',
    description: 'Easily search for any plant by its common or scientific name to get instant, detailed information.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'magnifying glass plant',
  },
  {
    icon: Camera,
    title: 'Identify with Your Camera',
    description: "Don't know the name? Just snap a photo, and our AI will identify the plant for you.",
    image: 'https://placehold.co/600x400.png',
    imageHint: 'camera phone plant',
  },
  {
    icon: Dna,
    title: 'Unlock In-Depth Knowledge',
    description: 'Go beyond the basics. Access scientific articles, genetic data, and detailed botanical resources with a premium subscription.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'scientific data',
  },
];

export default function WelcomePage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleNext = () => {
    if (current < welcomeSteps.length - 1) {
      api?.scrollNext();
    } else {
      localStorage.setItem('hasSeenWelcome', 'true');
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-lg shadow-2xl border-none">
        <CardContent className="p-0">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {welcomeSteps.map((step, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center text-center p-8 space-y-4">
                     <div className="relative w-full h-48 mb-4">
                       <Image
                        src={step.image}
                        alt={step.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        data-ai-hint={step.imageHint}
                       />
                    </div>
                    <step.icon className="w-12 h-12 text-primary" />
                    <h2 className="text-2xl font-bold font-headline text-primary">{step.title}</h2>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center mt-6 w-full max-w-lg">
         <div className="flex space-x-2 my-4">
            {welcomeSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  current === i ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        <Button onClick={handleNext} size="lg" className="w-full">
          {current === welcomeSteps.length - 1 ? "Let's Get Started" : 'Next'}
        </Button>
      </div>
    </div>
  );
}
