<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Table from "$lib/components/Table.svelte";

  export let data;
</script>

<Table
  tableName="Pricebooks"
  headerEntries={[
    "Pricebook reference",
    "Pricebook name",
    "Pricebook currency code",
  ]}
>
  <div slot="table-head">
    <Button displayValue="Create" href="/pricebooks/create" />
  </div>
  {#each data.pricebooks as pricebook}
    <div class="row">
      <div>
        <a href="/pricebooks/{pricebook.id}">{pricebook.pricebook_reference}</a>
      </div>
      <div>{pricebook.pricebook_name}</div>
      <div>{pricebook.pricebook_currency_code}</div>
    </div>
  {/each}
</Table>
