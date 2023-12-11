<script lang="ts">
  const alphabets: string[] = [...Array(26)].map((_, y) => String.fromCharCode(y + 65))
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  const getCustomStyles = (ch: string) => {
    let customStyle = "";
    if ($page.params?.alphabet?.length) {
      customStyle = " text-black "
      if ($page.params.alphabet == ch) {
        customStyle += " bg-sky-400 "
      } else {
        customStyle += " bg-white "
      }
    }
  
    return customStyle     
  }
  
  const onClickAlphabet = (alphabet: string) => {
    goto('/browse/' + alphabet)
  }
  </script>
  
  <section 
    class={`p-2 pl-8 flex flex-col gap-2 
      rounded-md custom-shadow 
      ${$page.params?.alphabet?.length === 1 ? 'bg-gray-200 text-black' : 'bg-gradient-to-br from-indigo-900 to-rose-900'}`}
  >
    {#if !$page.params?.alphabet}
    <h1 class="flex justify-center text-2xl font-medium text-white">
      Browse English Phrases 
    </h1>
    {/if}
    <menu class="flex justify-center items-center gap-2 flex-wrap py-4">
      {#each alphabets as ch (ch)}
      <button 
        class={`grid place-items-center text-xl 
          font-bold rounded-md text-[#1d2a57]
          bg-yellow-500 w-12 p-2  shadow-md
          hover:bg-[#1d2a57] hover:text-white
          ${getCustomStyles(ch)}`
        }
        on:click={() => goto('/browse/' + ch)}
      >
        { ch }
      </button>
      {/each}
    </menu>
  </section>
 
<style>
  .my-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
    row-gap: 0.5rem;
  }
  .custom-shadow {
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.6);
  }
</style>