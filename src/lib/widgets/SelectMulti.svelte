<script lang="ts">
  interface Props {
    choices: string[];
    label?: string;
    default?: string | string[];
    onchange: (value: string | string[]) => void;
  }
  let { choices, label = '', default: initial, onchange }: Props = $props();
  let val = $state(Array.isArray(initial) ? initial : (initial ? [initial] : []));
</script>

<div class="selector-multi">
    {#if label}<div class="selector-multi-label">{label}</div>{/if}
    <div class="checkbox-group">
        {#each choices as c (c)}
            <label class="checkbox-item">
                <input
                    type="checkbox"
                    value={c}
                    checked={val.includes(c)}
                    onchange={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.checked) {
                            val = [...val, c];
                        } else {
                            val = val.filter(v => v !== c);
                        }
                        onchange(val);
                    }}
                />
                <span>{c}</span>
            </label>
        {/each}
    </div>
</div>
