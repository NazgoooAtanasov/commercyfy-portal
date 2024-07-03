<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";
  import Section from "$lib/components/Section.svelte";

  let src = "";
  function setSrc(event: Event) {
    const target = event.target as HTMLInputElement;
    src = target.value;
  }
</script>

<Section>
  <Form action="?/create" method="POST">
    <Input
      onChange={setSrc}
      displayValue="Source"
      fieldName="src"
      required={true}
    />
    <Input displayValue="Source set" fieldName="srcset" required={true} />
    <Input displayValue="Alternative" fieldName="alt" required={false} />
  </Form>
  {#if src.length > 0}
    <h3>Image Preview</h3>
    <div class="image-preview">
      <img {src} alt="" />
    </div>
  {/if}
</Section>

<style>
  .image-preview {
    width: 100%;
  }

  .image-preview img {
    width: 100%;
    height: auto;
  }
</style>
