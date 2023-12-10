<script lang="ts">
import gsap from "gsap";
import { onMount } from "svelte";

export let id: string;
export let mediaList: Media[];

let container: HTMLElement | null = null
let disableLeftArrow = true
let disableRightArrow = false

let index = 0
const slideAmount = 248

let startPosX = 0

const onTouchStart = (ev: TouchEvent) => {
  const posX = ev.touches[0].clientX
  startPosX = posX
}

const onClickRight = () => {
  if (index < mediaList.length - 1) {
    index += 1
    gsap.to("#"+ id + " .slide", {
      x: Number(`-${index * slideAmount}`),
      duration: 0.5,
      onComplete: () => {
        disableLeftArrow = false
        if (index === mediaList.length - 1) 
          disableRightArrow = true
      }
    })
  }
}

const onClickLeft = () => {
  if (index > 0) {
    index -= 1
    gsap.to("#"+ id + " .slide", {
      x: Number(`${-index * slideAmount}`),
      duration: 0.5,
      onComplete: () => {
        disableRightArrow = false
        if (index === 0) 
          disableLeftArrow = true
      }
    })
  }
}

const onTouchEnd = (ev: TouchEvent) => {
  const deltaX = ev.changedTouches[0].clientX - startPosX
  if (deltaX > 0) {
    onClickLeft()
  } else if (deltaX < 0) {
    onClickRight()
  }
}

onMount(() => {
  const containerWidth = container?.offsetWidth
  const mediaWidth = mediaList.length * slideAmount
  disableLeftArrow = true

  if (mediaList.length === 1) {
    disableRightArrow= true
  }
  
  if (containerWidth && mediaWidth && containerWidth > mediaWidth) {
    disableRightArrow = true
  }
})


</script>
  
  
<div 
  bind:this={container} 
  class="flex gap-2 overflow-hidden p-1"
>
  <section class="grid place-items-center">
    <button 
      disabled={disableLeftArrow}
      class="bg-purple-500 w-8 h-8 grid place-items-center disabled:bg-gray-400
      p-2 rounded-full hover:scale-125 hover:bg-orange-600"
      on:click={onClickLeft}
    >
      <img 
        src="/chevron-left.svg" 
        alt="left" 
        class="w-4 h-4"
      >
    </button>
  </section>
  <section
    id={id}
    class="flex gap-[8px] overflow-hidden slider"
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
  >
    {#each mediaList as media (media.url)}
    <div class="shrink-0 w-64 cursor-pointer slide">
      {#if media.type == 'video'}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video 
        src={media.url}
        controls
        class="rounded-md"
      />
      {/if}
    </div>
    {/each}
  </section>
  <section class="grid place-items-center">
    <button 
      disabled={disableRightArrow}
      class="bg-purple-500 w-8 h-8 grid place-items-center disabled:bg-gray-400
      p-2 rounded-full hover:scale-125 hover:bg-orange-600"
      on:click={onClickRight}
    >
      <img 
        src="/chevron-right.svg" 
        alt="left" 
        class="w-4 h-4"
      >
    </button>
  </section>
</div>
