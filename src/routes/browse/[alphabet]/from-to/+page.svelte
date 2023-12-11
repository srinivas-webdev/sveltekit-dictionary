<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

	import BrowseWords from '$lib/components/browse-words.svelte';
  export let data;

  const onClick = (phrase: string) =>{
    goto(`/dictionary?search=${phrase}`)
  }
  </script>

<svelte:head>
	<title>{ "Phrases: " + $page.url.searchParams.get('from') + " - " + $page.url.searchParams.get('to')}</title>
</svelte:head>
  
<section class="grid grid-cols-1 m-8 gap-4">
  <p class="text-3xl font-lg text-[#1d2a57] pb-4 border-dotted border-b-2">
    Words starting from 
    <span class="font-extrabold text-sky-600 px-2">
      {$page.url.searchParams.get('from')} 
    </span>
    to
    <span class="font-extrabold text-sky-600 px-2">
      {$page.url.searchParams.get('to')}
    </span>
  </p>
  <BrowseWords />
  <section class="flex flex-wrap">
    {#each data.phrases as phrase (phrase)}
    <button 
      class="m-4 p-2 rounded-md text-xl bg-sky-300 flex gap-2 shadow-md
      hover:bg-green-400 hover:outline 
      hover:outline-sky-600 hover:outline-offset-2
      w-full sm:w-max flex flex-col items-center sm:flex-row"
      on:click={() => onClick(phrase)}
    >
      { phrase }
    </button>
    {/each}
  </section>
</section>
