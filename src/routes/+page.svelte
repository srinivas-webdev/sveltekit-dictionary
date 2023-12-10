<script lang="ts">
  export let data: PhraseDetails;
  import RandomWord from "$lib/components/random-word.svelte";
</script>

<div class="flex h-12 shadow-lg shadow-gray-500 w-max">
  <div class="h-12 w-12 bg-yellow-400" />
  <p class="text-2xl text-white font:base sm:font-lg bg-[#1d2a57] w-max p-2 px-4">
    Phrase of the Moment
  </p>
</div>
<RandomWord phrase={data}/>

