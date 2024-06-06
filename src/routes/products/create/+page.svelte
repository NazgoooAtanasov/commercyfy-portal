<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";
  import type { GetCategories } from "commercyfy-core-js";
  import { MultiSelect } from "svelte-multiselect";
  export let data;

  let categories: string[] = [];
  $: categoryIds = categories
    .reduce((acc, category) => {
      const x = data.categories.find((c) => c.category_reference === category);
      if (x) acc.push(x);
      return acc;
    }, [] as GetCategories)
    .map((category) => category.id)
    .join(",");
</script>

<section>
  <Form action="?/create" method="POST" submitDisplayValue="Create">
    <h3>Base product data</h3>
    <Input
      placeholder="Stylistic tshirt"
      displayValue="Product name"
      required={true}
      fieldName="product_name"
    />
    <Input
      placeholder="Stylistic tshirt"
      displayValue="Product description"
      required={true}
      fieldName="product_description"
    />
    <Input
      placeholder="Blue"
      displayValue="Product color"
      fieldName="product_color"
    />

    <h3>Product extesnions</h3>
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

    <h3>Category assignements</h3>
    <MultiSelect
      id="fruits"
      bind:selected={categories}
      placeholder="Select categories"
      options={data.categories.map((category) => category.category_reference)}
      --sms-border="1px solid var(--color-primary)"
      --sms-border-radius="var(--border-radius)"
      --sms-margin="10px"
      --sms-padding="20px 10px 10px 10px"
      --sms-selected-li-padding="5px"
      --sms-options-margin="5px 0"
      --sms-placeholder-color="gray"
    />
    <input type="hidden" name="categories" bind:value={categoryIds} />
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
