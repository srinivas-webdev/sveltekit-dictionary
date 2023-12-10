import { json } from '@sveltejs/kit';

import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL,  SUPABASE_KEY} from '$env/static/private';


async function getSearchPhrase(searchText: string) {
  const supabaseUrl = SUPABASE_URL as string
  const supabaseKey = SUPABASE_KEY as string
  const supabaseClient = createClient(supabaseUrl, supabaseKey)
  
  const { data: phrases } = await supabaseClient
  .from('phrase')
  .select("name")
  .ilike('name', searchText+'%')
  .limit(10)
  .order('name', { ascending: true })

  return phrases
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const searchPhrase = url.searchParams.get('query')
  let data = null
  if (searchPhrase) {
    data = await getSearchPhrase(searchPhrase)
  }
	
	return json(data);
}