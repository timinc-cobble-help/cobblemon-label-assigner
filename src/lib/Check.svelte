<script lang="ts">
  let {
    checked,
    label,
    onchange,
  }: { checked: boolean; label: string; onchange: (checked: boolean) => void } =
    $props();
</script>

<label>
  <input
    type="checkbox"
    {checked}
    onchange={(e) => onchange(e.currentTarget.checked)}
  />
  {label}
</label>
