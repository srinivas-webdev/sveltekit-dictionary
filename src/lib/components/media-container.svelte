<script lang="ts">
export let mediaList: Media[];

interface MediaListProps {
  mediaList: Media[]
}
</script>

<menu class="flex flex-wrap gap-2">
  {#each mediaList as media (media.url)}
  <li class="italic rounded-md p-1">
    <section 
      class="bg-gray-800 hover:bg-gray-600 
      rounded-md p-2 cursor-pointer
      transition duration-300 ease-in-out hover:ease-in"
    >
      <!-- svelte-ignore a11y-media-has-caption -->
      <video 
        src={media.url}
        class="w-48 h-36 rounded-md"
        controls
      />
    </section>
  </li> 
  {/each}
</menu>