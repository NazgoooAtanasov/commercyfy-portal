<script lang="ts">
  import type { GetCategory, GetProduct, Product } from "commercyfy-core-js";
  export let object: GetProduct | GetCategory;
  const entries = Object.entries(object).filter(
    ([key]) => key !== "custom_fields" && key !== "products",
  );
  const customFields = Object.entries(object.custom_fields);
</script>

<div class="properties">
  <h3>Base fields</h3>
  {#each entries as [key, value]}
    <div class="property">
      <div class="property-head">{key}</div>
      <div class="property-body">{value}</div>
    </div>
  {/each}

  {#if customFields.length > 0}
    <h3>Custom fields</h3>
    {#each customFields as [key, value]}
      <div class="property">
        <div class="property-head">{key}</div>
        <div class="property-body">{value}</div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .properties {
    background-color: var(--color-white);
    border-radius: var(--border-radius);
    padding: 0 10px 10px 10px;
    margin-bottom: 10px;
  }

  .property {
    border: 1px solid var(--color-accent);
    border-radius: var(--border-radius);
    padding: 15px;
    margin: 10px 0;
    box-shadow: var(--box-shadow);
  }

  .property-head {
    font-weight: bold;
    padding-bottom: 5px;
  }
</style>
