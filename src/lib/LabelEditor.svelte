<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import Check from "./Check.svelte";
  import Select from "./Select.svelte";

  let {
    labels,
    species,
  }: { labels: Record<string, string[]>; species: string[] } = $props();

  let labelData = $state(labels);

  let selectedLabel: string = $state("");
  const selectLabel: ChangeEventHandler<HTMLSelectElement> = (e) => {
    selectedLabel = e.currentTarget.value;
  };

  let filterText: string = $state("");
  const updateFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    filterText = e.currentTarget.value;
  };
</script>

<div>
  <Select
    onchange={selectLabel}
    value={selectedLabel}
    label="Labels"
    values={Object.keys(labelData).sort()}
  />
  <input
    placeholder="Search species..."
    value={filterText}
    oninput={updateFilter}
  />
  {#each species.filter((e) => e.includes(filterText)).sort() as specie}
    <Check
      label={specie}
      checked={labelData[selectedLabel]?.includes(specie)}
    />
  {/each}
</div>
