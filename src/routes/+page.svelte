<script>
  import Header from "$lib/components/header/Header.svelte";
</script>

<Header />
<main>
  <h1 class="text-gradient">Welcome to Phrasal Verbs Dictionary</h1>
</main>

<style>
  :root {
		--text-gradient: linear-gradient(
      0deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%,
      #fff800 100%
    );
	}

	h1 {
		margin: 2rem 0;
	}

	main {
		margin: auto;
		padding: 1em;
		max-width: 80ch;
	}

  .text-gradient {
    font-size: xx-large;
		font-weight: 900;
		background-image: var(--text-gradient);
    background-clip: text;
    -webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 100% 200%;
		background-position-y: 100%;
		border-radius: 0.4rem;
		animation: pulse 4s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			background-position-y: 0%;
		}
		50% {
			background-position-y: 80%;
		}
	}
</style>