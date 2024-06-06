<script lang="ts">
  import CreateView from "$lib/components/CreateView.svelte";
  import DetailView from "$lib/components/DetailView.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import Table from "$lib/components/Table.svelte";
  import { CategoryProductAssignSchema } from "$lib/formSchemas/index.js";
  export let data;
</script>

<DetailView object={data.category} />

<Dropdown text="Proucts in category">
  <Table
    headerEntries={["ID", "Product name", "Product Description", "Product color"]}
  >
    {#each data.category.products ?? [] as product}
      <div class="row">
        <a href="/product/{product.id}">{product.id}</a>
        <div>{product.product_name}</div>
        <div>{product.product_description}</div>
        <div>{product.product_color}</div>
      </div>
    {/each}
  </Table>
</Dropdown>


<CreateView
  triggerText="Assign product"
  method="POST"
  schema={CategoryProductAssignSchema}
  entry="Product assignement"
/>
