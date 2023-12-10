<script lang="ts">
  import MediaSlider from "./media-slider.svelte";
  export let phrase: PhraseDetails;
</script>


<section class="grid grid-cols-1 custom-wrapper-style">
  <section 
    class="grid place-items-center bg-gradient-to-r from-orange-500 to-orange-600 shadow-2xl
    rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
  >
    <p class="text-2xl text-white font-semibold p-2">
      { phrase.name }
    </p>
  </section>
  <section class="bg-gray-100 shadow-2xl rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none">
    {#each phrase.meanings as meaning, index (index)}
    <section 
      class="py-2 px-4 flex flex-col gap-2 text-[#1d2a57]"
    >
      <p class="text-xl font-semibold italic">
        { index + 1 }.  { meaning.name }
      </p>
      {#if meaning.examples}
      {#each meaning.examples as example, exampleIndex (example) }
      <p class="pl-4 text-md font-medium"> 
        { exampleIndex+1 }. { example }
      </p>
      {/each}
      {/if}
      {#if meaning.media?.length}
      <MediaSlider 
        id={'slider-'+index}
        mediaList={meaning.media}
      />
      {/if}
    </section> 
    {/each}
     
  </section>
</section>

<style>
  .custom-wrapper-style {
    @media screen and (min-width: 640px){
      grid-template-columns: 1fr 2fr;
    }
  }
  
</style>