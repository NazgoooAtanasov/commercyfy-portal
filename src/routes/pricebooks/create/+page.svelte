<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";
  import Section from "$lib/components/Section.svelte";
  export let data;
</script>

<Section>
  <Form action="?/create" method="POST">
    <h3>Base pricebook data</h3>
    <Input
      displayValue="Pricebook reference"
      fieldName="pricebook_reference"
      placeholder="global"
      required={true}
    />

    <Input
      displayValue="Pricebook name"
      fieldName="pricebook_name"
      placeholder="Global"
      required={true}
    />

    <Input
      displayValue="Pricebook currency code"
      fieldName="pricebook_currency_code"
      placeholder="USD"
      required={true}
    />

    {#if data.extensions.length > 0}
      <h3>Pricebook extesnions</h3>
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
    {/if}
  </Form>
</Section>
