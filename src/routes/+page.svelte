<script lang="ts">
  export let data: PhraseDetails;
  import RandomWord from "$lib/components/random-word.svelte";
</script>

<RandomWord phrase={data}/>

