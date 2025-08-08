<svelte:options customElement="my-custom-element" />

<script>
  let count = $state(0);
  
  function increment() {
    count++;
  }
</script>

<div>
  <h2>Custom Element Counter</h2>
  <p>Count: {count}</p>
  <button onclick={increment}>Increment</button>
</div>

<style>
  div {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: sans-serif;
  }
  
  button {
    padding: 0.5rem 1rem;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #005a9e;
  }
</style>