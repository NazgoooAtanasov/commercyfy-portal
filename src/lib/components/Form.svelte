<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Button from "./Button.svelte";

  export let action: string;
  export let submitDisplayValue: string = "Submit";
  export let method: "GET" | "POST" = "GET";

  let status: "Processing..." | "Success" | string = "";
  let statusStyle = "";
  $: {
    if (status === "Success") {
      statusStyle = "background-color: var(--color-success);";
    } else if (status === "Processing...") {
      statusStyle = "background-color: var(--color-primary);";
    } else {
      statusStyle = "background-color: var(--color-error);";
    }
  }

  export let onBeforeSubmit = (data: any) => {};
  const onBeforeSubmitDefault = (data: any) => {
    status = "Processing...";
    onBeforeSubmit(data);
  };

  export let onAfterSubmit = (data: any) => {};
  const onAfterSubmitDefault = (data: any) => {
    onAfterSubmit(data);
  };

  const useEnhance: SubmitFunction = (before) => {
    onBeforeSubmitDefault(before);

    return async (after) => {
      const { result } = after;
      if (result.type === "error") {
        status = result.error.message;
      } else if (result.type === "failure") {
        status =
          result.data?.message ?? "There was an error handling your request";
      } else {
        status = "Success";
      }

      onAfterSubmitDefault(after);
    };
  };
</script>

<form {method} {action} use:enhance={useEnhance}>
  {#if !!status}
    <div class="form-status" style={statusStyle}>{status}</div>
  {/if}
  <slot />
  <Button displayValue={submitDisplayValue} />
</form>

<style>
  .form-status {
    margin: 10px;
    padding: 10px 5px;
    color: var(--color-white);
    background-color: var(--color-primary);
    border-radius: var(--border-radius);
  }
</style>
