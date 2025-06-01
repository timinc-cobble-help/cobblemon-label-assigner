<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import Check from "./Check.svelte";
  import Select from "./Select.svelte";
  import Modal from "./Modal.svelte";

  let {
    labels,
    species,
  }: { labels: Record<string, string[]>; species: string[] } = $props();

  let labelData = $state(labels);
  function addLabel(name: string) {
    labelData[name] = [];
  }
  function addToLabel(species: string, label: string) {
    labelData[label].push(species);
    labelData[label].sort();
  }
  function removeFromLabel(species: string, label: string) {
    labelData[label].splice(labelData[label].indexOf(species), 1);
  }

  let selectedLabel: string = $state("");
  const selectLabel: ChangeEventHandler<HTMLSelectElement> = (e) => {
    selectedLabel = e.currentTarget.value;
  };

  let filterText: string = $state("");
  const updateFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    filterText = e.currentTarget.value;
  };

  let labelModalShown = $state(false);
  let newLabelName = $state("");
  function showLabelModal() {
    labelModalShown = true;
  }
  function hideLabelModal() {
    labelModalShown = false;
  }
  function handleAddLabel() {
    addLabel(newLabelName);
    selectedLabel = newLabelName;
    newLabelName = "";
    labelModalShown = false;
  }
</script>

<div>
  <!-- svelte-ignore a11y_no_redundant_roles -->
  <fieldset role="group">
    <Select
      onchange={selectLabel}
      value={selectedLabel}
      label="Labels"
      values={Object.keys(labelData).sort()}
    />
    <button onclick={showLabelModal}>+</button>
  </fieldset>
  {#if selectedLabel}
    <input
      placeholder="Search species..."
      value={filterText}
      oninput={updateFilter}
    />
    <div class="row">
      {#each species.filter((e) => e.includes(filterText)).sort() as specie}
        <Check
          label={specie}
          checked={labelData[selectedLabel]?.includes(specie)}
          onchange={(checked) =>
            (checked ? addToLabel : removeFromLabel)(specie, selectedLabel)}
        />
      {/each}
    </div>
  {/if}
</div>
<Modal open={labelModalShown} onclose={hideLabelModal} title="Add a new label">
  <input
    value={newLabelName}
    oninput={(e) => (newLabelName = e.currentTarget.value)}
  />
  <footer>
    <button onclick={hideLabelModal} class="secondary" type="button"
      >Cancel</button
    >
    <button onclick={handleAddLabel} type="button">Add</button>
  </footer>
</Modal>
