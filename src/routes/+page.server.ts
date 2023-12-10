import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL,  SUPABASE_KEY} from '$env/static/private';

async function getRandomPhrase() {
  const supabaseUrl = SUPABASE_URL as string
  const supabaseKey = SUPABASE_KEY as string
  const supabaseClient = createClient(supabaseUrl, supabaseKey)
  const { data: idList } = await supabaseClient
  .from('phrase')
  .select("id")
  
  let randomRowId = 1
  if (idList?.length) {
    randomRowId = Math.floor(Math.random()* idList.length)
    randomRowId = idList[randomRowId].id
  }
  const { data: phrase } = await supabaseClient
    .from('phrase')
    .select("name, meanings")
    .eq('id', randomRowId)
    .single()
  
  return phrase
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const phraseData = await getRandomPhrase()
  return phraseData
}