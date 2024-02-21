<script lang="ts">
  import { bounceInOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  // @TODO: here, there might be a slight issue with closing from the flyout and opening again the same option. check it out
  export let visible: boolean = false;
</script>

{#if visible}
  <section
    class="slider"
    transition:fly={{ duration: 150, easing: bounceInOut }}
  >
    <div class="slider-header">
      <slot name="slider-title" />
      <slot name="slider-close">
        <button on:click={() => (visible = false)} class="slider-close"
          >x</button
        >
      </slot>
    </div>

    <slot />
  </section>
{/if}

<style>
  .slider {
    z-index: 1;
    position: absolute;
    right: 0;

    display: flex;
    height: 100%;
    width: 50%;

    padding: 20px;
    flex-direction: column;

    border-left: 1px solid var(--color-accent);
    border-radius: var(--border-radius);
    background-color: var(--color-secondary);

    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .slider::-webkit-scrollbar {
    display: none;
  }

  .slider-header {
    display: flex;
    justify-content: space-between;
  }

  .slider-close {
    border: none;
    background: none;
    cursor: pointer;
  }
</style>
