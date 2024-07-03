<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Table from "$lib/components/Table.svelte";
  export let data;
</script>

<Table
  tableName="Products"
  headerEntries={["ID", "Name", "Description", "Color"]}
>
  <div slot="table-head">
    <Button displayValue="Create" href="/products/create" />
  </div>
  {#each data.products as product}
    <div class="row">
      <div>
        <a href="/products/{product.id}">{product.id}</a>
      </div>
      <div>{product.product_name}</div>
      <div>{product.product_description}</div>
      <div>{product.product_color ?? "<empty>"}</div>
    </div>
  {/each}
</Table>
