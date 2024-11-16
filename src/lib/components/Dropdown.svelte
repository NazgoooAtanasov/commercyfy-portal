<script lang="ts">
  export let text: string;
  let visible = false;
</script>

<div class="mb-2">
  <button
    class="mb-2 flex w-full justify-between rounded-md border border-silver bg-white p-3 text-left"
    on:click={() => (visible = !visible)}
  >
    <span>{text}</span>
    <span>
      <svg
        style="transform: {visible ? 'rotate(90deg)' : 'rotate(-90deg)'}"
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.00005 5.33344L6.99997 11.3333L6.33332 12L0.333403 6.00009L1.00005 5.33344Z"
          fill="currentColor"
        />
        <path
          d="M7 0.666651L1.00009 6.66656L0.333403 6.00009L6.33335 -5.82806e-08L7 0.666651Z"
          fill="currentColor"
        />
      </svg>
    </span>
  </button>

  {#if visible}
    <div>
      <slot />
    </div>
  {/if}
</div>

<style>
  svg {
    transform: rotate(-90deg);
    color: var(--color-accent);
  }
</style>
