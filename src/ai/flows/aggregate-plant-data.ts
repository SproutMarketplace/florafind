// src/ai/flows/aggregate-plant-data.ts
'use server';

/**
 * @fileOverview Aggregates plant data from multiple online databases and resources.
 *
 * - aggregatePlantData - A function that handles the plant data aggregation process.
 * - AggregatePlantDataInput - The input type for the aggregatePlantData function.
 * - AggregatePlantDataOutput - The return type for the aggregatePlantData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AggregatePlantDataInputSchema = z.object({
  plantName: z.string().describe('The common or scientific name of the plant to search for.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AggregatePlantDataInput = z.infer<typeof AggregatePlantDataInputSchema>;

const AggregatePlantDataOutputSchema = z.object({
  profile: z.string().describe('A comprehensive profile of the plant, including genetic data, taxonomic classification, scientific articles, and other relevant information.'),
  scientificArticles: z.array(z.string()).describe('A list of relevant scientific articles about the plant.'),
  botanicalResources: z.array(z.string()).describe('A list of links to botanical resources about the plant.'),
  geneticData: z.string().describe('A summary of the plant genetic data'),
  speciesCharacteristics: z.string().describe('Details on species characteristics'),
});
export type AggregatePlantDataOutput = z.infer<typeof AggregatePlantDataOutputSchema>;

export async function aggregatePlantData(input: AggregatePlantDataInput): Promise<AggregatePlantDataOutput> {
  return aggregatePlantDataFlow(input);
}

const aggregatePlantDataPrompt = ai.definePrompt({
  name: 'aggregatePlantDataPrompt',
  input: {schema: AggregatePlantDataInputSchema},
  output: {schema: AggregatePlantDataOutputSchema},
  prompt: `You are an AI assistant specializing in botany.  Aggregate plant information from multiple online databases, scientific articles, and botanical resources to provide a comprehensive plant profile.

  Plant Name: {{{plantName}}}
  {{#if photoDataUri}}
  Plant Photo: {{media url=photoDataUri}}
  {{/if}}

  Provide the plant profile, scientific articles, botanical resources, genetic data, and species characteristics.
  Ensure that the profile includes genetic data, taxonomic classification, and species characteristics.
  Return direct links to original data sources, scientific articles, and other relevant botanical resources.
`,
});

const aggregatePlantDataFlow = ai.defineFlow(
  {
    name: 'aggregatePlantDataFlow',
    inputSchema: AggregatePlantDataInputSchema,
    outputSchema: AggregatePlantDataOutputSchema,
  },
  async input => {
    const {output} = await aggregatePlantDataPrompt(input);
    return output!;
  }
);
