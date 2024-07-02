<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";
  import Section from "$lib/components/Section.svelte";
  import { MultiSelect } from "svelte-multiselect";

  let object: string[] = [];
  let type: string[] = [];
</script>

<Section>
  <Form action="?/create" method="POST">
    <MultiSelect
      maxSelect={1}
      name="type"
      bind:selected={object}
      placeholder="Select object"
      options={["Category", "Pricebook", "Inventory", "Product"]}
      --sms-border="1px solid var(--color-primary)"
      --sms-border-radius="var(--border-radius)"
      --sms-margin="10px"
      --sms-padding="20px 10px 10px 10px"
      --sms-selected-li-padding="5px"
      --sms-options-margin="5px 0"
      --sms-placeholder-color="gray"
    />

    <MultiSelect
      maxSelect={1}
      name="type"
      bind:selected={type}
      placeholder="Select type"
      options={["string", "number"]}
      --sms-border="1px solid var(--color-primary)"
      --sms-border-radius="var(--border-radius)"
      --sms-margin="10px"
      --sms-padding="20px 10px 10px 10px"
      --sms-selected-li-padding="5px"
      --sms-options-margin="5px 0"
      --sms-placeholder-color="gray"
    />

    <Input
      type="text"
      displayValue="Name"
      fieldName="name"
      placeholder="extensionName"
    />

    <Input type="checkbox" displayValue="Mandatory" fieldName="mandatory" />

    {#if type[0] === "string"}
      <Input type="number" displayValue="Min length" fieldName="max_len" />
      <Input type="number" displayValue="Max length" fieldName="min_len" />
    {/if}
  </Form>
</Section>
