<script lang="ts">
  let {
    onversionselected,
    versionlist,
  }: { onversionselected: (tag: string) => void; versionlist: string[] } =
    $props();
</script>

<h1>Pick a Cobblemon version to start with:</h1>
<div class="row">
  {#each versionlist as version}
    <button onclick={() => onversionselected(version)}>{version}</button>
  {/each}
</div>
