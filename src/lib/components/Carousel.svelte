<script lang="ts">
  import type { ProductImage } from "commercyfy-core-js";
  export let items: ProductImage[];
</script>

<div class="carousel">
  {#each items as item}
    <div class="carousel-item">
      <img src={item.src} alt={item.alt} />
    </div>
  {/each}
</div>

<style>
  .carousel {
    display: flex;
    overflow-x: scroll;
    max-width: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .carousel::-webkit-scrollbar {
    display: none;
  }

  .carousel-item {
    max-width: 360px;
    min-width: 360px;
  }

  .carousel-item img {
    width: 100%;
    height: auto;
  }
</style>
