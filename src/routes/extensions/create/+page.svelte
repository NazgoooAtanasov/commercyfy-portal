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
    <div class="form-field">
      <label for="system-object">System object</label>
      <MultiSelect
        maxSelect={1}
        name="$object"
        bind:selected={object}
        placeholder="Select object"
        options={["category", "pricebook", "inventory", "product"]}
        --sms-border="1px solid var(--color-primary)"
        --sms-border-radius="var(--border-radius)"
        --sms-padding="20px 10px 10px 10px"
        --sms-selected-li-padding="5px"
        --sms-options-margin="5px 0"
        --sms-placeholder-color="gray"
      />
    </div>

    <div class="form-field">
      <label for="object-type">Object type</label>
      <MultiSelect
        maxSelect={1}
        name="$type"
        bind:selected={type}
        placeholder="Select type"
        options={["string", "int"]}
        --sms-border="1px solid var(--color-primary)"
        --sms-border-radius="var(--border-radius)"
        --sms-padding="20px 10px 10px 10px"
        --sms-selected-li-padding="5px"
        --sms-options-margin="5px 0"
        --sms-placeholder-color="gray"
      />
    </div>

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

<style>
  label {
    padding: 10px 5px;
    font-size: 16px;
  }

  .form-field {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 10px;
    flex-direction: column;
  }
</style>
