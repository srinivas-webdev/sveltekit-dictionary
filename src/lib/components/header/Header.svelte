<script lang="ts">
	import logo from './logo.svg';
  import SearchBar from '../searchbar/SearchBar.svelte';
  import { goto } from '$app/navigation';

  const onClickLogo = () => {
    goto('/');
  }
</script>

<header>
	<section class="left">
		<img on:click={onClickLogo} src={logo} alt="HomePage" />
		
    <div class="text">Dictionary of Idioms and Phrasal Verbs</div>
	</section>
  <section class="right">
		<SearchBar />
	</section>

</header>

<style>
	header {
		display: grid;
		gap: 0.05rem;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    background-color: #1d2a57;
    align-items: center;
    box-shadow: 0px 2px 2px 3px red;
  }

	
  .left {
    display: grid;
    grid-template-columns: 2em 1fr;
    align-items: center;
    padding-left: 0.5rem;
    padding-right: .5rem;
    gap: 0.5rem;
  }

  .left img {
		width:clamp(1.3em, 4vw, 2em);
		height: clamp(1.3em, 4vw, 2em);
		object-fit: contain;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    justify-self: center;
  }

  .left img:hover {
    cursor: pointer;
  }
 
  .left .text {
		justify-self: center;
    color: white;
    font-weight: 600;
    font-family: sans-serif;
    font-size: clamp(.8rem, 4vw, 1rem); 
	}

</style>
