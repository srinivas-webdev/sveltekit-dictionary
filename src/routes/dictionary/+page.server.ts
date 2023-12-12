import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL,  SUPABASE_KEY} from '$env/static/private';

async function getPhraseDetails(name: string) {
  const supabaseUrl = SUPABASE_URL as string
  const supabaseKey = SUPABASE_KEY as string
  const supabaseClient = createClient(supabaseUrl, supabaseKey)
  const { data: phrase } = await supabaseClient
    .from('phrase')
    .select("id, name, meanings")
    .eq('name', name)
    .single()
  
  return phrase
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const phraseData = await getPhraseDetails(url.searchParams.get('search') as string)
  return phraseData
}