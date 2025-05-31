<script lang="ts">
  import LabelEditor from "./lib/LabelEditor.svelte";
  import VersionPicker from "./lib/VersionPicker.svelte";

  async function fetchJson(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  async function loadLabels(tag: string): Promise<{
    labelData: Record<string, string[]>;
    species: string[];
  }> {
    return {
      labelData: await fetchJson(`${tag}/labels.json`),
      species: (await fetchJson(`${tag}/species.json`)).sort(),
    };
  }
  let versionData: Promise<{
    labelData: Record<string, string[]>;
    species: string[];
  }> | null = $state(null);
  function handleSelectVersion(tag: string) {
    versionData = loadLabels(tag);
  }

  async function loadVersions(): Promise<string[]> {
    return ((await fetchJson("versions.json")) as string[]).sort();
  }
  let versionsList = $state(loadVersions());
</script>

<main class="container">
  {#if versionData}
    {#await versionData}
      <div>Loading...</div>
    {:then { labelData, species }}
      <LabelEditor labels={labelData} {species} />
    {/await}
  {:else}
    {#await versionsList}
      <div>Loading...</div>
    {:then list}
      <VersionPicker
        versionlist={list}
        onversionselected={handleSelectVersion}
      />
    {/await}
  {/if}
</main>
