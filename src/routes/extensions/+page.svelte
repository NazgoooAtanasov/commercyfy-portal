<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Form from "$lib/components/Form.svelte";
  import Section from "$lib/components/Section.svelte";
  import Table from "$lib/components/Table.svelte";
  import type { GetBaseExtensions } from "commercyfy-core-js";
  import { MultiSelect } from "svelte-multiselect";

  let type: string[] = [];

  let extensions: GetBaseExtensions = [];

  function onSubmit(e: any) {
    extensions = e.result.data.extensions;
  }
</script>

<Section>
  <Form action="?/filter" method="POST" onAfterSubmit={onSubmit}>
    <MultiSelect
      maxSelect={1}
      name="type"
      bind:selected={type}
      placeholder="Select type"
      options={["Category", "Pricebook", "Inventory", "Product"]}
      --sms-border="1px solid var(--color-primary)"
      --sms-border-radius="var(--border-radius)"
      --sms-margin="10px"
      --sms-padding="20px 10px 10px 10px"
      --sms-selected-li-padding="5px"
      --sms-options-margin="5px 0"
      --sms-placeholder-color="gray"
    />
  </Form>

  <Button href="/extensions/create" displayValue="Create" />

  <Table headerEntries={["Object", "Type", "Name", "Mandatory"]}>
    {#each extensions as extension}
      <div class="row">
        <div>
          {extension.$object}
        </div>
        <div>{extension.$type}</div>
        <div>{extension.name}</div>
        <div>{extension.mandatory}</div>
      </div>
    {/each}
  </Table>
</Section>
