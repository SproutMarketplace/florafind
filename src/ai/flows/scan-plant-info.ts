// Scans a plant image and returns comprehensive information about it.

'use server';

/**
 * @fileOverview An AI agent that scans a plant image and returns comprehensive information about it.
 *
 * - scanPlantInfo - A function that handles the plant scanning process.
 * - ScanPlantInfoInput - The input type for the scanPlantInfo function.
 * - ScanPlantInfoOutput - The return type for the scanPlantInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScanPlantInfoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ScanPlantInfoInput = z.infer<typeof ScanPlantInfoInputSchema>;

const ScanPlantInfoOutputSchema = z.object({
  plantInfo: z
    .string()
    .describe('Comprehensive information about the scanned plant.'),
});
export type ScanPlantInfoOutput = z.infer<typeof ScanPlantInfoOutputSchema>;

export async function scanPlantInfo(input: ScanPlantInfoInput): Promise<ScanPlantInfoOutput> {
  return scanPlantInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scanPlantInfoPrompt',
  input: {schema: ScanPlantInfoInputSchema},
  output: {schema: ScanPlantInfoOutputSchema},
  prompt: `You are an expert botanist. A user has provided an image of a plant.

  Identify the plant in the image. Provide detailed information about the plant, including its scientific name, common names, characteristics, habitat, and uses.

  Photo: {{media url=photoDataUri}}`,
});

const scanPlantInfoFlow = ai.defineFlow(
  {
    name: 'scanPlantInfoFlow',
    inputSchema: ScanPlantInfoInputSchema,
    outputSchema: ScanPlantInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
