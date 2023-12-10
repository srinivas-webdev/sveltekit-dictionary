<script>
	import "../app.css";
  import AppHeader from '$lib/components/AppHeader.svelte'
</script>

<AppHeader />
<main class="flex flex-col gap-8 m-4">
	<slot />
</main>
