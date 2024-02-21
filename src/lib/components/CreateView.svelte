<script lang="ts">
  import type { FormSchema } from "$lib/formSchemas";
  import { fly } from "svelte/transition";
  import Input from "./Input.svelte";
  import { bounceInOut } from "svelte/easing";
  import { enhance } from "$app/forms";

  export let schema: FormSchema[];
  export let showViewFlag = false;
  export let entry: string;
  export let method: string;
  export let triggerText: string;

  function showView() {
    showViewFlag = !showViewFlag;
  }
</script>

<button on:click={() => showView()} class="create-view-trigger">
  {triggerText}
</button>
{#if showViewFlag}
  <section
    class="create-view"
    transition:fly={{ duration: 150, easing: bounceInOut }}
  >
    <form {method} use:enhance>
      <div class="create-view-header">{entry}</div>
      <div class="create-view-body">
        {#each schema as [fieldName, fieldConfiguration]}
          <Input
            displayValue={fieldConfiguration.displayValue}
            {fieldName}
            required={fieldConfiguration.required}
            placeholder={fieldConfiguration.placeholder}
          />
        {/each}
      </div>
      <div class="create-view-footer">
        <button type="submit" class="create-view-submit">Submit</button>
        <button class="create-view-discard" on:click={() => showView()}
          >Discard</button
        >
      </div>
    </form>
  </section>
{/if}

<style>
  .create-view {
    position: absolute;
    width: 75%;
    min-height: 200px;
    top: 20px;
    right: 0;
    left: 0;
    margin: 0 auto;
    padding: 20px 10px;

    background-color: var(--color-secondary);
    border: 1px solid var(--color-accent);
    border-radius: var(--border-radius);
  }

  .create-view-trigger {
    position: fixed;
    bottom: 20px;
    right: 20px;

    padding: 20px 25px;
    color: var(--color-white);

    border-radius: var(--border-radius);
    background-color: var(--color-primary);
  }

  .create-view-header {
    text-align: center;
  }

  .create-view-body {
    margin: 20px 0;
  }

  .create-view-footer {
    display: flex;
    justify-content: center;
  }

  .create-view-submit {
    padding: 10px;
    margin: 0 5px;

    border-radius: var(--border-radius);
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .create-view-discard {
    padding: 10px;
    margin: 0 5px;

    border-radius: var(--border-radius);
    border: 1px solid var(--color-accent);
  }
</style>
