<script lang="ts">
  export let displayValue: string;
  export let fieldName: string;
  export let required: boolean = false;
  export let placeholder: string | undefined = undefined;
</script>

<div class="form-field">
  <label for={fieldName}
    >{displayValue}
    {#if required}
      <sup class="field-required">*</sup>
    {/if}
  </label>
  <input type="text" name={fieldName} {required} {placeholder} />
</div>

<style>
  .form-field {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 10px;
  }

  label,
  input {
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

  input {
    padding: 20px 10px 10px 10px;

    border-radius: var(--border-radius);
    border: none;
    outline: none;
  }

  input:focus {
    box-shadow: 0 0 0 1px var(--color-accent);
  }
</style>
