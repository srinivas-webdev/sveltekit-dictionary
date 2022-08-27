import { GraphQLClient } from 'graphql-request';
import type { Phrase } from '$lib/types/phrase.type';
import { HYGRAPH_URL } from '$env/static/private';

const graphcms = new GraphQLClient(HYGRAPH_URL);

export async function getMatchingWords(text: string) {
  let query = `{ 
    phrases(where: { name_starts_with: "${text}" }) {
      name
    }
  }`

  const words: string[] = text.split(' ', 2);
  if(words.length == 2) {
    if (words[1].length > 0) {
      query = `{ 
        phrases(where: { AND: [{ name_starts_with: "${words[0]}"}, { OR: [{name_contains: " ${words[1]}"}, {name_contains: ")${words[1]}"}, {name_contains: "(${words[1]}"}]}]}) {
            name
        }
      }`
    }
  }
  
  const { phrases } = await graphcms.request(query);
  return phrases;
}

export async function getPhraseInfo(text: string | null): Promise<Phrase | null> {
  const query = `{ 
    phrases(where: { name: "${text}" }) {
      name,
      type,
      meanings,
      relatedWords
    }
  }`

  const { phrases } = await graphcms.request(query);
  if (phrases?.length) {
    return phrases[0];
  }
  return null;
}
