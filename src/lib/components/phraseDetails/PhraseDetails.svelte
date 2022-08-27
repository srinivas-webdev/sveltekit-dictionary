<script lang="ts">
  import type { Phrase } from '$lib/types/phrase.type';
  export let phraseInfo: Phrase;
  import { searchTextWord } from '$lib/stores/words'
  
  let currentMeaningIndex = 0;
  let meanings: [string, string[]][];
  let relatedWords: Phrase["relatedWords"];
  let expand = false;

  $: {
    if (phraseInfo) {
      currentMeaningIndex = 0;
      searchTextWord.set(phraseInfo.name);
      meanings = Object.entries(phraseInfo.meanings);
      if (Object.hasOwn(phraseInfo, "relatedWords")) {
        relatedWords = phraseInfo.relatedWords;
        expand = false;
      }
    }
  }

  const toggleExpand = () => {
    expand = !expand;
  }
</script>

<section class="container">
  {#if phraseInfo}
    <div class="word-details-container">
      <div class="word-details-top">
        <p>
          Meaning of <span class="font-bold">{phraseInfo.name}</span> in English
        </p>
      </div>
      <div class="word-details-heading">
        <p class="name">{phraseInfo.name}</p>
        <p class="type">{phraseInfo.type}</p>
      </div>
      <div class="word-details-content-container">
        <div class="meanings-head">
          {#each meanings as _, i}
          <div
            on:click="{()=> currentMeaningIndex = i}" 
            class="number-container" class:number-container-selected="{i === currentMeaningIndex}">
            <div class="meaning-number" class:meaning-number-clicked="{i === currentMeaningIndex}">{i+1}</div>
          </div>
          {/each}
        </div>
        <div class="meanings-content-container">
          <p class="meaning">{meanings[currentMeaningIndex][0]}:</p>
          <ul class="examples">
            {#each meanings[currentMeaningIndex][1] as example}
            <li class="example">
              {example}
            </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <div class="related-words-container">
      <div on:click={toggleExpand} class="related-words-header">
        <div class="related-words-header-icon" class:related-words-expand="{expand === true}">+</div>
        <div class="related-words-header-text">Similar Phrases - {relatedWords?.length ? relatedWords.length : 0}</div>
      </div>
      {#if relatedWords && expand}
        <hr>
        <ul class="related-words-content">
          {#each relatedWords as relatedWord}
          <li class="related-word">
            <a href={`/dictionary?q=${relatedWord}`}>{relatedWord}</a>
          </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</section>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .word-details-container {
    display: flex;
    flex-direction: column;
    gap: 0px;
    margin-top: 1rem;
    padding: 1.25rem;
    border-radius: 0.5rem;
    background-color: rgb(249 250 251 / 1);
    box-shadow: 
    0 25px 50px 2px rgb(0 0 0 / .2), 
      0 25px 50px 2px rgb(0 0 0 / .1);
  }

  .word-details-top {
    border-bottom-width: 2px;
    border-bottom: solid;
    border-bottom-color: rgb(229, 231, 235);
  }

  .word-details-top p {
    font-style: italic;
    color: rgb(12 74 110 / 1);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    margin: 0px;
    padding-bottom: 1rem;
  }  

  .word-details-top p span {
    font-weight: 700;
  }

  .word-details-heading {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-bottom: solid;
    border-bottom-width: 4px;
    border-bottom-color: rgb(234 179 8 / 1);
  }

  .word-details-heading .name{
    font-size: 2.25rem;
    line-height: 2.5rem;
    color: rgb(29 42 87 / 1);
    font-weight: 500;
    margin: 0rem;
  }

  .word-details-heading .type{
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgb(12 74 110 / 1);
    font-weight: 700;
    font-style: italic;
    padding-bottom: 1rem;
    padding-top: 0.25rem;
    margin: 0rem;
  }

  .word-details-content-container {
    margin-top: 0.5rem;
    border-bottom: solid;
    border-bottom-width: 2px;
    border-bottom-color: rgb(234 179 8 / 1);
    padding-bottom: 0.5rem;
  }

  .meanings-head {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .number-container {
    display: grid;
    grid-row: 1;
    place-items: center;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    background-color: rgb(234 179 8 / 1);
  }

  .number-container:hover {
    cursor: pointer;
    background-color: rgb(12 74 110 / 1);
    color: rgb(255 255 255 / 1);
  }

  .number-container-selected {
    background-color: rgb(12 74 110 / 1);
    outline-style: solid;
    outline-offset: 2px;
    outline-color: #4b5563;
  }

  .meaning-number {
    font-weight: 700;
  }

  .meaning-number-clicked {
    color: white;
  }

  .meanings-content-container {
    margin-top: 1rem;;
  }

  .meaning {
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: rgb(12 74 110);
    font-weight: 600;
    margin-left: 1rem;;
  }

  .examples {
    list-style-position: outside;
    list-style-type: disc;
    margin-top: 0.5rem;
  }

  .example {
    font-style: italic;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: rgb(30 58 138 / 1);
  }
  
  .related-words-container {
    height: max-content;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 0.375rem;
    background-color: rgb(254 240 138);
    color: rgb(30 58 138);
    box-shadow: 0 25px 50px 2px rgb(0 0 0 / .1), 
      0 25px 50px 2px rgb(0 0 0 / .1);
  }

  .related-words-container:hover {
    cursor: pointer;
  }

  .related-words-header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .related-words-header-icon {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 800;
  }

  .related-words-expand {
    transform: rotate(45deg);
  }

  .related-words-header-text {
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  hr {
    height: 1px;
    border: 0;
    border-top: 0.25rem solid rgb(6, 181, 244);;
    margin: .5rem 0;
  }

  .related-words-content {
    list-style-position: outside;
  }

  .related-word a {
    color: rgb(30 58 138 / 1);
    font-style: italic;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    text-decoration-line: none;
  }

  .related-word a:hover {
    text-decoration-line: underline;
    cursor: pointer;
    color: rgb(6, 181, 244);
  }

  @media (min-width: 640px) {
    .container {
      grid-template-columns: minmax(900px, 1fr) minmax(200px, 1fr);
      margin-left: 2.5rem;
      margin-right: 2.5rem;
    }

    .word-details-container {
      margin-left: 2.5rem;
      margin-right: 2.5rem;
      margin-top: 2rem;
    }

    .related-words-container {
      margin-top: 2rem;
    }
  }
</style>