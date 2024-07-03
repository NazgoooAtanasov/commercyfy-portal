<section>
  <slot />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;

    flex-grow: 1;
    padding: 0 10px;

    background-color: var(--color-white);
    border-radius: var(--border-radius);
  }
</style>
