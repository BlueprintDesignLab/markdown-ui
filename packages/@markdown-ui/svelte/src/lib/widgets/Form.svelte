<script lang="ts">
	import ButtonGroup from './ButtonGroup.svelte';
	import Select from './Select.svelte';
	import SelectMulti from './SelectMulti.svelte';
	import Slider from './Slider.svelte';
	import TextInput from './TextInput.svelte';

  interface Field {
    type: string;
    id: string;
    [key: string]: any;
  }
  interface Props {
    fields: Field[];
    submitLabel?: string;
    onchange: (values: Record<string, unknown>) => void;
  }
  let { fields, submitLabel = 'Submit', onchange }: Props = $props();

  // local state keyed by id
  const data = $state<Record<string, unknown>>({});
  function set(id: string, value: unknown) {
    data[id] = value;
  }

  function submit() {
    onchange({ ...data });
  }
</script>

<div class="widget-form">
  {#each fields as f (f.id)}
    {#if f.type === 'button-group'}
      <ButtonGroup {...f} choices={f.choices ?? []} onchange={(v) => set(f.id, v)} />
    {:else if f.type === 'select'}
      <Select {...f} choices={f.choices ?? []} onchange={(v) => set(f.id, v)} />
    {:else if f.type === 'select-multi'}
      <SelectMulti {...f} choices={f.choices ?? []} onchange={(v) => set(f.id, v)} />
    {:else if f.type === 'slider'}
      <Slider
        {...f}
        min={f.min ?? 0}
        max={f.max ?? 100}
        onchange={(v) => set(f.id, v)}
      />
    {:else if f.type === 'text-input'}
      <TextInput {...f} onchange={(v) => set(f.id, v)} />
    {/if}
  {/each}

  <button type="button" onclick={submit}>{submitLabel}</button>
</div>

