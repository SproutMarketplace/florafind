// src/app/subscribe/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const features = [
  'Unlimited Plant Identification',
  'Access to all Scientific Articles',
  'Detailed Genetic Data',
  'Advanced Search Filters',
  'Ad-Free Experience',
];

function SubscribePage() {
  const router = useRouter();

  const handleStartTrial = (plan: 'monthly' | 'annual') => {
    // In a real application, you would integrate with a payment provider like Stripe here.
    // For now, we'll just log the choice and redirect to the homepage.
    console.log(`Starting 7-day free trial for ${plan} plan.`);
    router.push('/');
  };

  const handleDecline = () => {
    router.push('/');
  };

  return (
    <main className="flex-1 bg-background/50 py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Star className="w-16 h-16 text-primary" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Unlock FloraFind Premium
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Start your 7-day free trial to access exclusive features. Elevate your botanical knowledge today. No commitment, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {/* Monthly Plan */}
          <Card className="shadow-lg flex flex-col">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-headline">Monthly</CardTitle>
              <CardDescription>
                <span className="text-4xl font-bold text-primary">$4.99</span>
                /month
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={() => handleStartTrial('monthly')}>
                Start 7-Day Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Annual Plan */}
          <Card className="shadow-lg border-2 border-primary flex flex-col relative">
            <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Best Value
              </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-headline">Annual</CardTitle>
              <CardDescription>
                <span className="text-4xl font-bold text-primary">$44.99</span>
                /year
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={() => handleStartTrial('annual')}>
                Start 7-Day Free Trial
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" onClick={handleDecline}>
            Maybe Later
          </Button>
        </div>
      </div>
    </main>
  );
}

export default SubscribePage;
