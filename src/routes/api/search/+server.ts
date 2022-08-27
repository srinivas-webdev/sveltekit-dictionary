import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getMatchingWords } from '$lib/api/hygraph';

export const GET: RequestHandler = async ({ url }) => {
  const word = url.searchParams.get('word');
  let phrases = null;

  if (word) {
    phrases = await getMatchingWords(word);
    if (phrases) {
      return new Response(JSON.stringify(phrases));
    }
  } 
 
  throw error(404);
};