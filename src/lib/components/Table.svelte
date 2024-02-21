<script lang="ts">
  export let headerEntries: string[];
  export let tableName: string | undefined = undefined;
</script>

<div class="table">
  <h2>{tableName}</h2>
  <div class="row rows-descriptors">
    {#each headerEntries as entry}
      <div>{entry}</div>
    {/each}
  </div>
  <slot />
</div>

<style>
  .table {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    padding: 0 10px;

    border-radius: var(--border-radius);
    background-color: var(--color-white);
    color: var(--color-accent);
  }

  :global(.row) {
    width: 100%;
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid var(--color-accent);
  }

  :global(.row:not(.rows-descriptors):hover) {
    background-color: var(--color-silver);
  }

  :global(.row > *) {
    flex-basis: 33%;
    position: relative;
  }
</style>
