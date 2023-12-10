<script lang="ts">
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  type SearchResult = {
    name: string;
  }

  let searchBtnHovered = false
  let searchBtnFocused = false
  let fillColor = 'black'
  let matchedPhrases: string[] = []
  let matchedPhrasesMenu: HTMLElement | null = null
  let showResultsMenu = false
  let searchInputText: string = ""
  let searchInputRef: HTMLElement | null = null
  let originalSearchText: string = ""
  let activePhraseIndex = -1
  
  $: {
    fillColor = searchBtnHovered ? 'white' : 'black'
  }

  $: {
    fillColor = searchBtnFocused ? 'white' : 'black'
  }
 
  const onClick = (e: MouseEvent) => {
    const matchedPhrasesMenuDimentions: DOMRect | undefined = matchedPhrasesMenu?.getBoundingClientRect()
    let isClickOutsidePhrasesMenu = false;
    
    // if the click is outside the displayed phrases list container
    if (
      e.clientX < matchedPhrasesMenuDimentions!.left ||
      e.clientX > matchedPhrasesMenuDimentions!.right ||
      e.clientY < matchedPhrasesMenuDimentions!.top ||
      e.clientY > matchedPhrasesMenuDimentions!.bottom
    ) {
      isClickOutsidePhrasesMenu = true
    }
  
    // if the click is inside search input box
    const searchInputTextDimentions: DOMRect | undefined = searchInputRef?.getBoundingClientRect()
    let isClickInsideSeachInput = true
    if (
      e.clientX < searchInputTextDimentions!.left ||
      e.clientX > searchInputTextDimentions!.right ||
      e.clientY < searchInputTextDimentions!.top ||
      e.clientY > searchInputTextDimentions!.bottom
    ) {
      isClickInsideSeachInput = false
    }
  
    if (isClickOutsidePhrasesMenu) {
      if (isClickInsideSeachInput) {
        showResultsMenu = true
      } else {
        showResultsMenu = false
      }
    }
  }

  $: {
    if (browser) {
      showResultsMenu ? 
      window.addEventListener("click", onClick) : 
      window.removeEventListener("click", onClick)
    }
    
  }

  async function searchPhrase(searchText: string) {
    if (!searchText.length) {
      matchedPhrases = []
      showResultsMenu = false
      activePhraseIndex = -1
      originalSearchText = ""
    } else {
      // check the results are shown and no change in the search string
      // due to up and down keys
      if (showResultsMenu && 
        (searchText == originalSearchText || activePhraseIndex !== -1)) {
        return
      }
      // save the search Input Text
      originalSearchText = searchText

      // get the search results
      const response = await fetch(`/api/phrase?query=${searchText}`)

      const matchedResults: SearchResult[] = await response.json()
      if (matchedResults?.length) {
        matchedPhrases = matchedResults?.map((result)  => result.name)
        showResultsMenu = true
      } else {
        showResultsMenu = false
        matchedPhrases = []
      }
    }
  }

  $: searchInputText && debounceSearch()
  let timeoutId: ReturnType<typeof setTimeout>;
  function debounceSearch() {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      searchPhrase(searchInputText)
		}, 500);
  }

  function onClickSearchInput() {
    if (matchedPhrases?.length && !showResultsMenu) {
      showResultsMenu = true
    } else {
      showResultsMenu = false
    }
  }  

  const onKeyEnterSearchInput = () => {
    if (searchInputText && matchedPhrases?.includes(searchInputText)) {
      if (showResultsMenu) showResultsMenu = false
      matchedPhrases.length = 0
      goto('/dictionary?search=' + searchInputText)
    }
  }

  const handleKeyEventOnActivePhrase = (eventType: string, event: KeyboardEvent) => {
    event.stopPropagation()
    if (!showResultsMenu) {
      return
    }
  
    if (eventType === "keydown") {
      const matchedPhrasesSize = matchedPhrases?.length
      if (matchedPhrasesSize &&
        (activePhraseIndex === matchedPhrasesSize)) {
        activePhraseIndex = -1
      } else {
        activePhraseIndex++
      }
    } else if (eventType == "keyup") {
      if (activePhraseIndex == -1 && matchedPhrases) {
        activePhraseIndex = matchedPhrases.length - 1
      } else {
        activePhraseIndex--
      }
    }
    
    if (activePhraseIndex == -1) {
      searchInputText = originalSearchText
    } else {
      if (matchedPhrases) {
        searchInputText = matchedPhrases[activePhraseIndex]
      }
    }
  }
 
  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        handleKeyEventOnActivePhrase("keydown", event)
        break;
      case "ArrowUp":
        handleKeyEventOnActivePhrase("keyup", event)
        break;
      case "Enter":
        onKeyEnterSearchInput()
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  }

  const handleMouseEventOnActivePhrase = (index: number, eventType: string) => {
    if (eventType == "mouseenter") {
      activePhraseIndex = index
    }
  }
</script>
  

<header class="flex flex-col gap-1 p-1 py-2 sm:flex-row">
  <section class="flex items-center gap-2 mr-4">
    <a href='/'>
      <picture 
        class="cursor-pointer" 
        title="Click to home"
      >
        <img 
          src="/favicon.png" 
          alt="logo" 
          width="30" 
          height="30"
        >
      </picture>
    </a>
    
    <p class="font-semibold text-white text-lg">
      Dictionary of Idioms and Phrasal Verbs
    </p>
  </section>
  <section 
    id="search-wrapper" 
    class={`flex flex-col sm:w-2/5 shadow-md shadow-gray-800 hover:shadow-xl hover:shadow-gray-700
    ${!showResultsMenu ? ' rounded-br-md rounded-bl-md ' : ''}`}
  >
    <section class="flex h-10 sm:h-12">
      <input
        bind:this={searchInputRef} 
        bind:value={searchInputText}
        placeholder="Search here"
        class={`w-full rounded-tl-md outline-none pl-2
        ${!showResultsMenu ? ' rounded-bl-md ': ''}`}
        on:click={onClickSearchInput}
        on:keydown={onKeyDown}
      >
      {#if searchInputText?.length}
      <section 
        class="grid items-center bg-white"
      >
        <button 
          id="clear-query-button" 
          class="grid items-center bg-gray-300 
          hover:bg-sky-300 p-1 mr-[1px] rounded-md" 
          aria-label="Clear"
          on:click={() => {
            if (searchInputText) searchInputText = ""}}
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            class=""
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M2.06834 13.4173C1.68757 13.7981 1.07024 13.7981 0.689477 13.4173C0.308716 13.0365 0.308716 12.4192 0.689477 12.0384L5.67424 7.05368L0.688891 2.06833C0.30813 1.68757 0.30813 1.07023 0.688891 0.68947C1.06965 0.308709 1.68699 0.308709 2.06775 0.68947L7.0531 5.67482L12.0385 0.68938C12.4193 0.308618 13.0366 0.308618 13.4174 0.689379C13.7982 1.07014 13.7982 1.68748 13.4174 2.06824L8.43196 7.05368L13.4168 12.0385C13.7976 12.4193 13.7976 13.0366 13.4168 13.4174C13.0361 13.7982 12.4187 13.7982 12.038 13.4174L7.0531 8.43254L2.06834 13.4173Z" 
              fill="black"
            />
          </svg>
        </button>
      </section>
      {/if}
      
      <section class="h-full bg-white">
        <div 
          class="relative mt-1 w-3/4 h-3/4 border-solid border-r-2 border-gray-300 pr-1"
        />
      </section>
      <section 
        id="search-query-button-wrapper" 
        tabindex="0"
        role="button"
        class={`z-20 grid items-center bg-white px-4 
          rounded-tr-md cursor-pointer 
          ${!showResultsMenu ? 'rounded-br-md': ''}
          ${searchBtnFocused || searchBtnHovered ? 'bg-gradient-to-r from-yellow-500 to-pink-700': ''}
        `}
        on:focusin={() => searchBtnFocused = true}
        on:focusout={() => searchBtnFocused = false}
        on:mouseenter={() => searchBtnHovered = true}
        on:mouseleave={() => searchBtnHovered = false}
      >
        <button 
          id="search-query-button" 
          aria-label="Search" 
          tabindex="-1" 
          class="cursor-pointer"
          on:click={onKeyEnterSearchInput}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="17" 
            class="icon" 
            viewBox="0 0 18 17"
          >
            <path 
              fill={fillColor} 
              fill-rule="evenodd" 
              d="M1.6 7.336a5.736 5.736 0 1 1 11.471 0 5.736 5.736 0 0 1-11.471 0ZM7.336 0a7.336 7.336 0 1 0 4.957 12.743l3.56 3.561a.8.8 0 0 0 1.132-1.131l-3.636-3.636A7.336 7.336 0 0 0 7.335 0Z" 
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </section>
    </section>
      
    {#if showResultsMenu}
    <section 
        bind:this={matchedPhrasesMenu}
        class={`relative w-full z-10`}
      >
        <section class="absolute flex flex-col bg-white  border-2 border-t-0 w-full rounded-b-md pb-1 shadow-2xl shadow-zinc-900/50">
          <section 
            class="flex flex-col w-full before:border-t-[1px] before:border-gray-300 before:pb-2 before:mx-2"
          >
            {#each  matchedPhrases as word, index (index)}
            <a 
              href={'/dictionary?search='+word}
              class={`pl-2 cursor-pointer 
                ${index == activePhraseIndex ? 'bg-blue-100 cursor:pointer': ''}
              `}
              on:mouseenter={() => handleMouseEventOnActivePhrase(index, 'mouseenter')}
              on:mouseleave={() => activePhraseIndex = -1}
            >
              { word }
            </a>
            {/each}
          </section>
        </section>
      </section>
    {/if}
    
  </section>
</header>
  
  
<style>
  header {
    padding-left: .25rem;
    box-shadow: rgb(47, 53, 60) 0px 15px 10px -10px;
    background:linear-gradient(to right,rgb(0 0 0 / 80%), rgb(176, 176, 176), rgb(0 0 0 / 80%));
  }
</style>