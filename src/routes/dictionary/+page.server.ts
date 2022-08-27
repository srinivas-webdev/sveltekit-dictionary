import { error } from '@sveltejs/kit';
import { getPhraseInfo } from '$lib/api/hygraph';
import type { PageServerLoad } from './$types';
import type { Phrase } from '$lib/types/phrase.type';

export const load: PageServerLoad = async ({ url }) => {
  const word: string | null = url.searchParams.get('q');
  const phrase: Phrase | null = await getPhraseInfo(word);
  if (phrase) {
    return phrase;
  }
  throw error(404, 'Not found');
}
