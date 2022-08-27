<script context="module" lang="ts">
	import { 
    matchedPhrases, 
    displayMatchedPhrases, 
    searchTextWord 
  } from '$lib/stores/words'

  import CancelIcon from "./icons/close-icon.webp";
  import SearchIcon from "./icons/search-icon.webp"

  export async function getMatchingWords(text: string) {
   let res = await fetch(`/api/search?word=${text}`);
   let phrases = await res.json();
   matchedPhrases.set(phrases.slice(0, 10))
	}

</script>

<script lang="ts">
  type Word = {
    name: string;
  }

  let searchText: string;
  let matchedWords: Word[]; 
  $: searchText = $searchTextWord;
  $: matchedWords = $matchedPhrases;
  
  const clickHandler = () => {
    displayMatchedPhrases.set(true);
  }
  
  const clickWordHandler = (word: Word) => {
    searchText = word.name;
    displayMatchedPhrases.set(false);
  } 
</script>

<section class="search">
  <input bind:value={searchText} 
    on:input={()=> {getMatchingWords(searchText)}} 
    on:click={clickHandler}
    placeholder="Search English" 
  >
  <div on:click="{() => searchText = ''}" class='cancel'>
    <img alt='cancel' src={CancelIcon}>
  </div>
  <div on:click={()=> {getMatchingWords(searchText)}}  class='find'>
    <img alt='find' src={SearchIcon}>
  </div>
  
  {#if matchedWords?.length > 0 && $displayMatchedPhrases}
    <section class="phrases">
      {#each matchedWords as word}
        <a on:click={() => clickWordHandler(word)} href={`/dictionary?q=${word.name}`} class="phrase">{word.name}</a>
      {/each}  
    </section>
  {/if}
</section>


<style>
  .search {
    position: relative;
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(20px,30px) minmax(40px,50px);
    z-index: 10;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
    padding-bottom: .25rem;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .search input{
    padding-left: .5rem;
    border-radius: .125rem;
    height: 2rem;
    border-color: white;
    outline: none;
  }

  .cancel {
    cursor: pointer;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cancel img {
    width: 1.5rem;
		height: 1.5rem;
  }

  .find {
    cursor: pointer;
    background-color: rgb(234 179 8) ;
    display: flex;
    justify-content: center;
    align-items: center;
  }  

  .find img {
    width: 1.5rem;
		height: 1.5rem;
  }

  .phrases {
    z-index: 20;
    position: absolute;
    box-shadow: 5px 5px 5px black;
    padding-bottom: .5rem; 
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    width: 100%;
    top: 2rem;
    background-color: white;
    border-color: gray;
  }

  .phrase {
    display: block;
    padding-left: 0.5rem;
    font-weight: 600;
    font-family: sans-serif;
    color: rgb(72, 72, 72);
    text-decoration: none;
  }

  .phrase:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
