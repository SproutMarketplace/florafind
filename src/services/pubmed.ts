'use server';

/**
 * @fileOverview A service for interacting with the PubMed API to find scientific articles.
 *
 * - searchPubMed - A function that searches for articles on PubMed and returns their URLs.
 */

const PUBMED_API_BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

type PubMedSearchResponse = {
  esearchresult: {
    idlist: string[];
  };
};

/**
 * Searches PubMed for articles related to a given query.
 * @param query The search term (e.g., a plant name).
 * @param retmax The maximum number of articles to return.
 * @returns A promise that resolves to an array of PubMed article URLs.
 */
export async function searchPubMed(query: string, retmax = 5): Promise<string[]> {
  try {
    // Step 1: Use esearch to find article IDs for the given query.
    const searchParams = new URLSearchParams({
      db: 'pubmed',
      term: `${query}[Title/Abstract]`,
      retmax: retmax.toString(),
      retmode: 'json',
      sort: 'relevance',
    });

    const searchResponse = await fetch(`${PUBMED_API_BASE_URL}/esearch.fcgi?${searchParams.toString()}`);

    if (!searchResponse.ok) {
      throw new Error(`PubMed API request failed with status: ${searchResponse.status}`);
    }

    const searchData: PubMedSearchResponse = await searchResponse.json();
    const articleIds = searchData.esearchresult.idlist;

    if (!articleIds || articleIds.length === 0) {
      return [];
    }
    
    // Step 2: Construct the URLs for each article ID.
    const articleUrls = articleIds.map(id => `https://pubmed.ncbi.nlm.nih.gov/${id}/`);
    
    return articleUrls;
  } catch (error) {
    console.error('Error fetching from PubMed:', error);
    // In case of an error, return an empty array to prevent crashing the flow.
    return [];
  }
}
