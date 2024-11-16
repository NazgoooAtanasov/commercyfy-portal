<script lang="ts">
  import PageHeader from "../../PageHeader.svelte";
</script>

<div class="p-8">
  <PageHeader>
    <span slot="header">Product Creation</span>
    <span slot="description">Fill in the required fields</span>
  </PageHeader>

  <div class="mb-5 flex flex-col">
    <label for="" class="mb-3 w-full">Name</label>
    <input
      class="w-full rounded-md border p-2 pl-4"
      placeholder="Placeholder"
      id=""
      type="text"
    />
  </div>

  <div class="flex flex-col">
    <label for="" class="mb-3 w-full">Description</label>
    <textarea class="w-full rounded-md border p-2 pl-4" name="" id=""
    ></textarea>
  </div>
</div>
