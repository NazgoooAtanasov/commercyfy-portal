<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";

  export let data;
</script>

<section>
  <Form action="?/create" method="POST" submitDisplayValue="Create">
    <h3>Base category data</h3>

    <Input
      displayValue="Category Reference"
      fieldName="category_reference"
      required={true}
      placeholder="man-clothing"
    />
    <Input
      displayValue="Category Name"
      fieldName="category_name"
      required={true}
      placeholder="man's clothing"
    />
    <Input
      displayValue="Category Description"
      fieldName="category_description"
      required={false}
      placeholder="Man's clothing category contains all products for man that..."
    />

    <h3>Category extesnions</h3>
    {#each data.extensions as extension}
      <Input
        type={extension.$type === "int" ? "number" : "text"}
        displayValue={extension.name}
        required={extension.mandatory}
        fieldName={extension.name}
        placeholder={extension.name}
        minLength={extension.min_len}
        maxLength={extension.max_len}
      />
    {/each}
  </Form>
</section>

<style>
  section {
    flex-grow: 1;
    padding: 0 10px;

    background-color: var(--color-white);
    border-radius: var(--border-radius);
  }

  h3 {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
