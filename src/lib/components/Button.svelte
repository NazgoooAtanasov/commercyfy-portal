<script lang="ts">
  export let displayValue: string;
  export let type: "primary" | "secondary" = "primary";
  export let bg_color: string | null = null;
  export let onClick: () => void = () => {};
  export let href: string | null = null;
</script>

<div>
  {#if href}
    <a
      {href}
      class={type}
      style={bg_color ? `background-color: ${bg_color};` : ""}
      on:click={onClick}>{displayValue}</a
    >
  {:else}
    <button
      class={type}
      style={bg_color ? `background-color: ${bg_color};` : ""}
      on:click={onClick}>{displayValue}</button
    >
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 10px;
  }

  button,
  a {
    margin-top: 5px;
    padding: 10px;
    border-radius: var(--border-radius);
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .secondary {
    background-color: var(--color-white);
    color: var(--color-primary);
  }
</style>
