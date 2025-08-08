<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
  import Navbar from '$lib/Navbar.svelte';

	import '../lib/MyCustomElement.svelte';
	import '../lib/widgets/Widget.svelte';
	import '../lib/widgets.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<main>
  {@render children?.()}
</main>

<style>
  main {
    min-height: calc(100vh - 4rem);
  }
  
  @media (max-width: 768px) {
    main {
      min-height: calc(100vh - 6rem);
    }
  }
</style>

