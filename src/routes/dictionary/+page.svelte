<script lang="ts">
	import { page } from '$app/stores';
	import MediaContainer from '$lib/components/media-container.svelte';
  export let data: PhraseDetails;  
  let searchPhrase = $page.url.searchParams.get('search')
</script>

<svelte:head>
	<title>{ "Meaning of: " + searchPhrase}</title>
</svelte:head>
  
<menu class="flex justify-between items-center mt-2 p-1">
  <p class="text-blue-900 italic">
    Meaning(s) of <span class="font-extrabold text-xl">
      { searchPhrase }</span> in English
  </p>
</menu>

{#if data}
<menu class="my-container">
  {#each data.meanings as meaning (meaning)}
  <section 
    class="m-1 mr-2 rounded-md p-1 rounded-md bg-sky-900
      text-white flex flex-col gap-2 custom-shadow"
  >
    <p class="text-xl font-normal">
      { meaning.name }
    </p>
    <p class="border border-b-2  border-green-500" />
    <p class="text-lg font-semibold">
      Example Sentences:
    </p>
    {#if meaning.examples}
    {#each meaning.examples as example,index (index)}
    <li 
      class="italic flex flex-col gap-2 text-xl font-normal  leading-4" 
    >
      { index+1 }. { example } 
    </li>
    {/each}
    {/if}
    <p class="border border-b-2 border-gray-400" />
    {#if meaning.media !== undefined && meaning.media.length > 0}
      <MediaContainer mediaList={meaning.media}/>
    {/if}
  </section>
  {/each}
  
</menu>
{/if}

<style>
  .my-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
  .custom-shadow {
    box-shadow: 3px 3px 2px 0px rgb(65, 1, 1);
  }
</style>