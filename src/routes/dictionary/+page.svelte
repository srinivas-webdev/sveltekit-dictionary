<script lang="ts">
  import type { Phrase } from '$lib/types/phrase.type';
  import { matchedPhrases, displayMatchedPhrases } from '$lib/stores/words'
  import Header from "$lib/components/header/Header.svelte";
  import PhraseDetails from "$lib/components/phraseDetails/PhraseDetails.svelte"
  
  export let data: Phrase;

  const toggleVisibility = () => {
    displayMatchedPhrases.set(false);
  }
</script>

{#if $displayMatchedPhrases && $matchedPhrases?.length > 0}
  <div on:click={toggleVisibility} class="top-layer">
  </div>
{/if}
<Header />
<main>
  <PhraseDetails phraseInfo={data} />
</main>

<style>
  .top-layer {
    position: absolute;
    z-index: 1;
    top: 0;
    width: 100vw;
  }
  :global(body) {
    background-color: rgb(158, 227, 250);
  }
</style>