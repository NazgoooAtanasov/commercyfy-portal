<script>
  import Section from "$lib/components/Section.svelte";
  import Icons from "$lib/components/Icons.svelte";
</script>

<Section>
  <h1>Commercyfy portal</h1>
  <p>
    This page is the hub for the portal. From here you can navigate to any place
    you want within the portal.
  </p>

  <div class="navigation-items">
    <a href="/categories" class="navigation-item">
      <h3>Categories</h3>
      <div class="icon">
        <Icons icon="categories" />
      </div>
    </a>
    <a href="/products" class="navigation-item">
      <h3>Products</h3>
      <div class="icon">
        <Icons icon="products" />
      </div>
    </a>
    <a href="/inventories" class="navigation-item">
      <h3>Inventories</h3>
      <div class="icon">
        <Icons icon="inventories" />
      </div>
    </a>
    <a href="/pricebooks" class="navigation-item">
      <h3>Pricebooks</h3>
      <div class="icon">
        <Icons icon="pricebooks" />
      </div>
    </a>
  </div>
</Section>

<style>
  .navigation-items {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(auto-fill, 200px);
    flex-grow: 1;
  }

  .navigation-item {
    display: flex;
    flex-direction: column;
    grid-column: span 4;
    padding: 10px;
    justify-items: center;
    align-items: center;
    border: 1px solid var(--color-accent);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .icon {
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 150px;
    color: var(--color-black);
  }

  h3 {
    margin: 0 5px;
  }
</style>
