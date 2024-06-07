<script lang="ts">
  import { page } from "$app/stores";
  import "./variables.css";
</script>

<main>
  <nav>
    <a href="/categories">Categories</a>
    <a href="/products">Products</a>
    <a href="/inventories">Inventories</a>
    <a href="/signin">Signin</a>
  </nav>
  <div class="content">
    <div class="location-breadcrumb">
      {$page.url.pathname}
    </div>
    <slot />
  </div>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    display: flex;
  }

  nav {
    display: flex;
    border-bottom: 1px solid var(--color-accent);
    flex-basis: 20%;
    height: 100%;
    background-color: var(--color-primary);
    flex-direction: column;
  }

  nav * {
    padding: 20px;
    color: white;
  }

  .content {
    position: relative;
    width: 100%;
    display: flex;
    background-color: var(--color-secondary);
    padding: 0 20px;
    flex-direction: column;
    overflow-y: scroll;
  }

  .location-breadcrumb {
    margin: 10px 0;
    padding: 10px;
    background-color: var(--color-gray);
    border-radius: var(--border-radius);
    font-weight: bold;
  }
</style>
