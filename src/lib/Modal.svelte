<script lang="ts">
  let {
    open,
    title,
    onclose,
    children,
  }: {
    open: boolean;
    title: string;
    onclose: () => void;
    children: Snippet<[]>;
  } = $props();
</script>

<dialog {open} onclick={onclose} closedby="none">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <article
    onclick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <header>
      <button aria-label="Close" rel="prev" onclick={onclose}></button>
      <p>
        <strong>{title}</strong>
      </p>
    </header>
    {@render children?.()}
  </article>
</dialog>
