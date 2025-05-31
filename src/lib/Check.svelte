<script lang="ts">
  let {
    checked,
    label
  }: { checked: boolean, label: string } = $props();
</script>

<label>
  <input type="checkbox" checked={checked} />
  {label}
</label>
