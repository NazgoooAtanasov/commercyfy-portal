<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";
  import Section from "$lib/components/Section.svelte";
  import Table from "$lib/components/Table.svelte";

  export let data;

  let productSelected = "";
</script>

<Section>
  <Form action="?/record" method="POST">
    <input type="hidden" name="productId" bind:value={productSelected} />
    {#if !productSelected}
      <Table
        tableName="Products"
        headerEntries={["", "ID", "Name", "Description"]}
      >
        {#each data.products as product}
          <div class="row">
            <div>
              <Button
                displayValue="Select"
                onClick={() => (productSelected = product.id)}
              />
            </div>
            <div>{product.id}</div>
            <div>{product.product_name}</div>
            <div>{product.product_description}</div>
          </div>
        {/each}
      </Table>
    {/if}

    {#if productSelected}
      <Input
        type="number"
        placeholder="100"
        required={true}
        fieldName="allocation"
        displayValue="Allocation"
      />
    {/if}
  </Form>
</Section>
