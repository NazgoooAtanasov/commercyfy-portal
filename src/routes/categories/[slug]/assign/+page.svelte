<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/Form.svelte";
  import Table from "$lib/components/Table.svelte";
  import { commercyfyUnwrap } from "commercyfy-core-js";
  export let data;

  let productIds = "";

  function onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      productIds += target.dataset.productId + ",";
    } else {
      productIds = productIds.replace(target.dataset.productId + ",", "");
    }
  }
</script>

{#await data.products.values}
  <p>...loading</p>
{:then products}
  {#if commercyfyUnwrap(products)}
    {products.error}
  {:else}
    <Form action="?/products" method="POST">
      <input type="hidden" name="productIds" value={productIds} />
      <Table
        tableName="Products"
        headerEntries={["", "ID", "Name", "Description"]}
      >
        {#each products as product}
          <div class="row">
            <div>
              <input
                on:change={onChange}
                type="checkbox"
                data-product-id={product.id}
              />
            </div>
            <div>{product.id}</div>
            <div>{product.product_name}</div>
            <div>{product.product_description}</div>
          </div>
        {/each}
      </Table>
    </Form>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
