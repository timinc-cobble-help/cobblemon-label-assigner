<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";

  let {
    onchange,
    value,
    values,
    label,
  }: {
    onchange: ChangeEventHandler<HTMLSelectElement>;
    value: string;
    values: string[];
    label: string;
  } = $props();
</script>

<select {onchange} {value}>
  <option value="">{label}...</option>
  {#each values as value}
    <option>{value}</option>
  {/each}
</select>
