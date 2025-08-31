<script lang="ts">
  interface Props {
    choices: string[];
    label?: string;
    default?: string;
    onchange: (value: string | string[]) => void;
  }
  let { choices, label = '', default: initial, onchange }: Props = $props();

  let val = $state(initial ?? choices[0]);
</script>

<div class="selector">
  {#if label}<label>{label}</label>{/if}
  <select bind:value={val} onchange={() => onchange(val)}>
    {#each choices as c (c)}
      <option value={c}>{c}</option>
    {/each}
  </select>
</div>
