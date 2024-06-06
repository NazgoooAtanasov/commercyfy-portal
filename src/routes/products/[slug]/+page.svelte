<script lang="ts">
  import Carousel from "$lib/components/Carousel.svelte";
  import DetailView from "$lib/components/DetailView.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import Table from "$lib/components/Table.svelte";
  export let data;
</script>

<DetailView object={data.product} />

{#if data.product.images?.length > 0}
  <Dropdown text="Images">
    <section class="images">
      <Carousel items={data.product.images} />
    </section>
  </Dropdown>
{/if}

{#if data.product.categories?.length > 0}
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

<style>
.images {
  padding: 10px;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
}
</style>
