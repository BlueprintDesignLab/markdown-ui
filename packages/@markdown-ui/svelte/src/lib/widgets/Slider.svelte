<script lang="ts">
  interface Props {
    min: number;
    max: number;
    step?: number;
    label?: string;
    default?: number;
    onchange: (value: number) => void;
  }
  let { min, max, step = 1, label = '', default: initial = min, onchange }: Props = $props();
  let value = $state(initial);
</script>

<div class="widget-slider">
  {#if label}<label>{label}</label>{/if}
  <div class="slider-container">
    <div class="slider-values">
      <span class="min-value">{min}</span>
      <span class="current-value">{value}</span>
      <span class="max-value">{max}</span>
    </div>
    <input
      type="range"
      bind:value
      {min}
      {max}
      {step}
      onchange={() => onchange(value)}
    />
  </div>
</div>
