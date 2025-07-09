'use client';

import { useState } from 'react';
import { scanPlantInfo, ScanPlantInfoOutput } from '@/ai/flows/scan-plant-info';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Loader2, AlertCircle, Leaf } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type ScanState = 'idle' | 'loading' | 'success' | 'error';

export default function PlantScanner() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [result, setResult] = useState<ScanPlantInfoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) { // 4MB limit for Genkit media
        toast({
            variant: "destructive",
            title: "File too large",
            description: "Please upload an image smaller than 4MB.",
        });
        return;
    }

    setScanState('loading');
    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      setImagePreview(dataUri);
      try {
        const response = await scanPlantInfo({ photoDataUri: dataUri });
        setResult(response);
        setScanState('success');
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(errorMessage);
        setScanState('error');
        toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: "Could not identify the plant. Please try another image.",
        });
      }
    };
    reader.onerror = () => {
        setError('Failed to read file.');
        setScanState('error');
    };
  };

  return (
    <div className="w-full max-w-2xl space-y-8">
        <Card className="w-full shadow-lg">
            <CardContent className="p-6">
                <div 
                    className={cn(
                        "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors",
                        scanState === 'loading' && 'cursor-not-allowed bg-muted/50',
                        scanState === 'error' ? 'border-destructive' : 'border-border hover:border-primary/50'
                    )}
                >
                    <input
                        type="file"
                        id="plant-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={scanState === 'loading'}
                    />
                    <label htmlFor="plant-upload" className={cn("cursor-pointer text-center", scanState === 'loading' && 'cursor-not-allowed')}>
                        
                            {scanState === 'loading' ? (
                                <>
                                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                                    <p className="mt-4 text-sm font-medium text-muted-foreground">Analyzing Plant...</p>
                                </>
                            ) : (
                                <>
                                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <p className="mt-4 text-lg font-medium text-primary">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP up to 4MB</p>
                                </>
                            )}
                    </label>
                </div>
            </CardContent>
        </Card>

      {scanState === 'success' && result && imagePreview && (
        <Card className="shadow-lg animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary flex items-center gap-2"><Leaf />Identification Result</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
                 <Image
                    src={imagePreview}
                    alt="Scanned plant"
                    width={400}
                    height={400}
                    className="rounded-lg object-cover w-full aspect-square border"
                />
            </div>
            <div>
              <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">{result.plantInfo}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {scanState === 'error' && error && (
        <Card className="border-destructive bg-destructive/10 shadow-lg animate-in fade-in-50">
            <CardHeader className="flex-row items-center gap-2">
                <AlertCircle className="w-6 h-6 text-destructive" />
                <CardTitle className="text-destructive">Analysis Failed</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive/80">{error}</p>
                <p className="text-sm text-destructive/70 mt-2">Please try a different, clearer image.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
