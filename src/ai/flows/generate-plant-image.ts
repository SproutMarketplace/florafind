'use server';
/**
 * @fileOverview Generates a plant image using an AI model.
 *
 * - generatePlantImage - A function that handles the plant image generation process.
 * - GeneratePlantImageInput - The input type for the generatePlantImage function.
 * - GeneratePlantImageOutput - The return type for the generatePlantImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePlantImageInputSchema = z.object({
  plantName: z.string().describe('The common or scientific name of the plant.'),
});
export type GeneratePlantImageInput = z.infer<typeof GeneratePlantImageInputSchema>;

const GeneratePlantImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GeneratePlantImageOutput = z.infer<typeof GeneratePlantImageOutputSchema>;

export async function generatePlantImage(
  input: GeneratePlantImageInput
): Promise<GeneratePlantImageOutput> {
  return generatePlantImageFlow(input);
}

const generatePlantImageFlow = ai.defineFlow(
  {
    name: 'generatePlantImageFlow',
    inputSchema: GeneratePlantImageInputSchema,
    outputSchema: GeneratePlantImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `a photorealistic image of a single ${input.plantName} plant in a natural environment`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
