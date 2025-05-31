<script lang="ts">
  let {
    onversionselected,
    versionlist,
  }: { onversionselected: (tag: string) => void; versionlist: string[] } =
    $props();
</script>

<div>
  {#each versionlist as version}
    <button onclick={() => onversionselected(version)}>{version}</button>
  {/each}
</div>
