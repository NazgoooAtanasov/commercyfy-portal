<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";
  import Section from "$lib/components/Section.svelte";
  export let data;
</script>

<Section>
  <Form action="?/create" method="POST">
    <h3>Base inventory data</h3>
    <Input
      displayValue="Inventory reference"
      fieldName="inventory_reference"
      placeholder="global"
      required={true}
    />
    <Input
      displayValue="Inventory name"
      fieldName="inventory_name"
      placeholder="Global inventory"
      required={true}
    />

    {#if data.extensions.length > 0}
      <h3>Inventory extesnions</h3>
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
