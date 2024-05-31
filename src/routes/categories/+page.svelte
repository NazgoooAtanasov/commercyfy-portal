<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Table from "$lib/components/Table.svelte";
  export let data;
</script>

<Table tableName="Categories" headerEntries={["ID", "Description"]}>
  <div slot="table-head">
    <Button displayValue="Create" href="/categories/create" />
  </div>
  {#each data.categories as category}
    <div class="row">
      <div>
        <a href="/categories/{category.id}">{category.category_reference}</a>
      </div>
      <div>{category.category_description}</div>
    </div>
  {/each}
</Table>
