<script>
  import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />
<main>
  <slot />
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