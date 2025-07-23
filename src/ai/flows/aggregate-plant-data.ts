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
import { searchPubMed } from '@/services/pubmed';

const getScientificArticles = ai.defineTool(
  {
    name: 'getScientificArticles',
    description: 'Retrieves a list of scientific articles about a specific plant from PubMed.',
    inputSchema: z.object({
      plantName: z.string().describe('The common or scientific name of the plant.'),
    }),
    outputSchema: z.array(z.string()),
  },
  async (input) => {
    return await searchPubMed(input.plantName);
  }
);


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
  scientificArticles: z.array(z.string()).describe('A list of relevant scientific articles about the plant from PubMed.'),
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
  tools: [getScientificArticles],
  prompt: `You are an AI assistant specializing in botany. Your task is to aggregate comprehensive information about a specific plant.

  First, use the provided tools to gather scientific articles about the plant.
  Then, using your own knowledge and the gathered information, generate the rest of the plant's profile.

  Plant Name: {{{plantName}}}
  {{#if photoDataUri}}
  Plant Photo: {{media url=photoDataUri}}
  {{/if}}

  Provide the plant profile, a list of scientific articles (which you MUST get from the provided tool), other botanical resources, genetic data, and species characteristics.
  Ensure that the profile includes genetic data, taxonomic classification, and species characteristics.
  Return direct links to original data sources for botanical resources.
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
