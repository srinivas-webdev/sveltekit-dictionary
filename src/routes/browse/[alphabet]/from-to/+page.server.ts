import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL,  SUPABASE_KEY} from '$env/static/private';


async function getPhrasesFromTo(name: string, from: string, to: string) {
  const supabaseUrl = SUPABASE_URL as string
  const supabaseKey = SUPABASE_KEY as string
  const supabaseClient = createClient(supabaseUrl, supabaseKey)
  const { data: res } = await supabaseClient
  .from('phrase')
  .select("name")
  .ilike('name', name+'%')
  .order('name', { ascending: true })
  .gte('name', from)
  .lte('name', to)

  const phrases = res?.map(phrase => phrase.name) ?? []
  
  return {
    phrases: phrases
  }
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
	const phrases = await getPhrasesFromTo(params.alphabet, url.searchParams.get('from') as string, url.searchParams.get('to') as string)
  return phrases
}