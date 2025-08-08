<script lang="ts">
  interface Props {
    choices: string[];
    label?: string;
    default?: string;
    onchange: (value: string) => void;
  }
  let { choices, label = '', default: initial, onchange }: Props = $props();
  let selected = $state(initial ?? choices[0]);
</script>

<div class="widget-button-group">
  {#if label}<label>{label}</label>{/if}
  <div role="group" aria-label={label}>
    {#each choices as c (c)}
      <button
        type="button"
        aria-pressed={selected === c}
        onclick={() => { selected = c; onchange(c); }}
      >
        {c}
      </button>
    {/each}
  </div>
</div>
