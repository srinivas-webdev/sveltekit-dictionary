import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL,  SUPABASE_KEY} from '$env/static/private';


async function getPhrasesStartsWithLetter(name: string) {
  const supabaseUrl = SUPABASE_URL as string
  const supabaseKey = SUPABASE_KEY as string
  const supabaseClient = createClient(supabaseUrl, supabaseKey)
  
  const { data: res } = await supabaseClient
  .from('phrase')
  .select("name")
  .ilike('name', name+'%')
  .order('name', { ascending: true })

  const phrases = res?.map(phrase => phrase.name)

  // divide the phrases into groups of 10 
  // and get first and last phrases in each group
  const groupSize = 10
  let groupedPhrases: string[][] = []

  if (phrases) {
    groupedPhrases = new Array(Math.floor(phrases.length / groupSize))
    
    for (let i = 0; i < groupedPhrases.length; i++) {
      groupedPhrases[i] = [phrases[i*groupSize], phrases[((i+1)*groupSize)-1]]
    }
    if(phrases.length > (groupedPhrases.length)*groupSize) {
      groupedPhrases.push([phrases[(groupedPhrases.length)*groupSize], phrases.at(-1)])
    }
  }

  return {
    phrases: groupedPhrases
  }
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params}) {
	const phrases = await getPhrasesStartsWithLetter(params.alphabet)
  return phrases
}