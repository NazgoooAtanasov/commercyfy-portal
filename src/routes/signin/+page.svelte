<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/Input.svelte";
</script>

<section class="p-8">
  <Form action="?/signin" method="POST">
    <Input
      displayValue="Email"
      fieldName="email"
      required={true}
      placeholder="email@domain.com"
    />
    <Input
      displayValue="Password"
      fieldName="password"
      required={true}
      type="password"
      placeholder="******"
    />
  </Form>
</section>
