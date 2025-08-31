<script lang="ts">
  interface Props {
    placeholder?: string;
    label?: string;
    default?: string;
    onchange: (value: string) => void;
  }
  let { placeholder = '', label = '', default: initial = '', onchange }: Props = $props();
  let value = $state(initial);
</script>

<div class="widget-button">
  {#if label}<label>{label}</label>{/if}
  <input
    type="text"
    bind:value
    {placeholder}
    onfocusout={() => onchange(value)}
  />
</div>
