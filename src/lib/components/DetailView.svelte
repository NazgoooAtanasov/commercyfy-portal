<script lang="ts">
  import type { Category, Product } from "commercyfy-core-js";
  export let object: Product | Category;
  export let headerName: string | undefined;
  const entries = Object.entries(object);
</script>

<div class="detail-view">
  <h2>
    {headerName}
  </h2>
  {#each entries as [key, value]}
    <div class="detail-bubble">
      <div class="detail-bubble-head">{key}</div>
      <div class="detail-bubble-body">{value}</div>
    </div>
  {/each}
</div>

<style>
  h2 {
    grid-column: span 16;
  }
  .detail-view {
    display: grid;
    width: 100%;

    padding: 0 10px 10px;
    margin-bottom: 10px;

    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: auto;
    gap: 5px;

    border-radius: var(--border-radius);
    background-color: var(--color-white);
  }

  .detail-bubble {
    border: 1px solid var(--color-accent);
    border-radius: var(--border-radius);
    padding: 25px;
    grid-column: span 4;
  }

  .detail-bubble-head {
    border-bottom: 1px solid var(--color-accent);
  }
</style>
