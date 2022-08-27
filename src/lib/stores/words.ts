import { writable } from 'svelte/store';

export const matchedPhrases = writable([])
export const displayMatchedPhrases = writable(true)
export const searchTextWord = writable("")