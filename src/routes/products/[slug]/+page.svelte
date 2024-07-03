<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Carousel from "$lib/components/Carousel.svelte";
  import DetailView from "$lib/components/DetailView.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import Table from "$lib/components/Table.svelte";
  export let data;
  console.log(data);
</script>

<DetailView object={data.product} />

<Dropdown text="Images">
  <div class="assign-images">
    <Button
      href={`/products/${$page.params.slug}/image`}
      displayValue="Create image"
    />
  </div>
  {#if data.product.images?.length > 0}
    <section class="images">
      <Carousel items={data.product.images} />
    </section>
  {/if}
</Dropdown>

{#if data.product.categories && data.product.categories.length > 0}
  <Dropdown text="Categories">
    <Table headerEntries={["Category reference", "Category name"]}>
      {#each data.product.categories as category}
        <div class="row">
          <div>
            <a href="/categories/{category.id}">{category.category_reference}</a
            >
          </div>
          <div>{category.category_name}</div>
        </div>
      {/each}
    </Table>
  </Dropdown>
{/if}

{#if data.product.inventories && data.product.inventories.length > 0}
  <Dropdown text="Inventories">
    <Table headerEntries={["Allocaiton", "Inventory"]}>
      {#each data.product.inventories as inventory}
        <div class="row">
          <div>{inventory.allocation}</div>
          <div>
            <a href="/inventories/{inventory.inventory_id}"
              >{inventory.inventory_id}</a
            >
          </div>
        </div>
      {/each}
    </Table>
  </Dropdown>
{/if}

{#if data.product.pricebooks && data.product.pricebooks.length > 0}
  <Dropdown text="Pricebooks">
    <Table headerEntries={["Price", "Pricebook"]}>
      {#each data.product.pricebooks as pricebook}
        <div class="row">
          <div>{pricebook.price}</div>
          <div>
            <a href="/pricebooks/{pricebook.pricebook_id}"
              >{pricebook.pricebook_id}</a
            >
          </div>
        </div>
      {/each}
    </Table>
  </Dropdown>
{/if}

<style>
  .images {
    padding: 10px;
    background-color: var(--color-white);
    border-radius: var(--border-radius);
  }

  .assign-images {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
</style>
