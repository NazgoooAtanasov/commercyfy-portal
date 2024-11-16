<script lang="ts">
  export let displayValue: string;
  export let fieldName: string;
  export let type: "text" | "password" | "number" | "checkbox" = "text";
  export let required: boolean = false;
  export let placeholder: string | undefined = undefined;
  export let minLength: number | undefined = undefined;
  export let maxLength: number | undefined = undefined;
  export let onInput: (e: Event) => void = () => {};
  export let onFocus: (e: Event) => void = () => {};
  export let onBlur: (e: Event) => void = () => {};
  export let onChange: (e: Event) => void = () => {};
</script>

<div class="mb-5 flex flex-col">
  <label for={fieldName} class="mb-3 w-full">
    {displayValue}
    {#if required}
      <sup class="text-red text-s">*</sup>
    {/if}
  </label>
  <input
    {placeholder}
    {type}
    class="w-full rounded-md border p-2 pl-4"
    name={fieldName}
    minlength={minLength}
    maxlength={maxLength}
    on:input={onInput}
    on:focus={onFocus}
    on:blur={onBlur}
    on:change={onChange}
  />
</div>
