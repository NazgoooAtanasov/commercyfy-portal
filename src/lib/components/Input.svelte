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

<div class="form-field">
  <label for={fieldName}
    >{displayValue}
    {#if required}
      <sup class="field-required">*</sup>
    {/if}
  </label>
  <input
    {type}
    name={fieldName}
    {required}
    {placeholder}
    minlength={minLength}
    maxlength={maxLength}
    on:input={onInput}
    on:focus={onFocus}
    on:blur={onBlur}
    on:change={onChange}
  />
</div>

<style>
  .form-field {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 10px;
  }

  label,
  input:not([type="checkbox"]) {
    flex-basis: 100%;
  }

  label {
    padding: 10px 5px;
    font-size: 16px;
  }

  .field-required {
    font-size: 11px;
    color: var(--color-error);
  }

  input:not([type="checkbox"]) {
    box-shadow: 0 0 0 1px var(--color-primary);
    padding: 20px 10px 10px 10px;

    border-radius: var(--border-radius);
    border: none;
    outline: none;
  }

  input:focus {
    box-shadow: 0 0 0 1px var(--color-accent);
  }
</style>
