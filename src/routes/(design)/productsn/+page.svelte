<script lang="ts">
  import PageHeader from "../PageHeader.svelte";
</script>

<div class="p-8">
  <PageHeader>
    <span slot="header">Products</span>
    <span slot="description">
      Manage your products and view their details.
    </span>
  </PageHeader>

  <div class="grid-template grid grid-cols-12">
    <div class="border-b pb-3 pt-3"></div>
    <div class="col-span-3 border-b pb-3 pt-3 text-dovegray">Name</div>
    <div class="col-span-2 border-b pb-3 pt-3 text-dovegray">SKU</div>
    <div class="col-span-2 border-b pb-3 pt-3 text-dovegray">Price</div>
    <div class="col-span-2 border-b pb-3 pt-3 text-dovegray">Inventory</div>
    <div class="col-span-2 border-b pb-3 pt-3 text-dovegray"></div>
  </div>
</div>
