<script lang="ts">
  import { page } from '$app/stores';
	import BrowseWords from '$lib/components/browse-words.svelte';

  export let data;

  const getHref = (phrase: string[], alphabet: string) =>{
    let href = ""
    if (phrase[0] === phrase[1]) {
      href = "/dictionary?search="+phrase[0]
    } else {
      href = "/browse/"+alphabet+"/from-to"
      +"?from="+phrase[0]+"&to="+phrase[1]
    }
    
    return href
  }

</script>

<svelte:head>
	<title>{ "Phrases starting with: " + $page.params.alphabet }</title>
</svelte:head>
  
<section class="grid grid-cols-1 m-8 gap-4">
  <p class="text-3xl font-lg text-[#1d2a57] pb-4 border-dotted border-b-2">
    Words starting with 
    <span class="font-extrabold text-sky-600">
      { $page.params.alphabet }
    </span>
  </p>
  <BrowseWords />
  <menu class="flex flex-wrap">
    {#each data.phrases as phrase,index (index)}
     <a 
      class="m-4 p-2 rounded-md text-xl bg-sky-300 flex gap-2 shadow-md
      hover:bg-green-400 hover:outline 
      hover:outline-sky-600 hover:outline-offset-2
      w-full sm:w-max flex flex-col items-center sm:flex-row"
      href={getHref(phrase, $page.params.alphabet)}
    >
    <span class="">{ phrase[0] }</span> 
    { (phrase[0] !== phrase[1]) ? " ...... ": "" } 
    <span class=" ">
      { (phrase[0] !== phrase[1]) ? phrase[1]: "" }
    </span>
    </a>  
    {/each}
  </menu>
</section>

