<script lang="ts">
import type { Category } from 'commercyfy-core-js';
    import { backInOut, bounceInOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';

export let data;
let categoryProductPreview: Category | null = null;

function setProductPreview(category: Category) {
  if (categoryProductPreview && categoryProductPreview.id === category.id) {
    categoryProductPreview = null;
  } else {
    categoryProductPreview = category;
  }
}
</script>

<div class="root">
  <div class="categories">
    <div class="fields fields-descriptor">
      <div> ID </div>
      <div> Description </div>
    </div>

    {#each data.categories as category}
      <button on:click={() => setProductPreview(category)} class="fields">
        <div><a href="/categories/{category.id}">{category.category_reference}</a></div>
        <div>{category.category_description}</div>
        <span class="expander">+</span>
      </button>
    {/each}
  </div>

{#if categoryProductPreview}
  <section class="slider" transition:fly={{duration: 150, easing: bounceInOut}}>
    <div class="slider-header">
      <h2>Products</h2>
      <button on:click={() => (categoryProductPreview = null)} class="slider-close">x</button>
    </div>
    <div class="fields fields-descriptor">
      <div> ID </div>
      <div> Description </div>
    </div>

    {#each categoryProductPreview.products || [] as product}
      <a href="/products/" class="fields">
        <div>{product.id}</div>
        <div>{product.product_description}</div>
      </a>
    {/each}

    {#each categoryProductPreview.products || [] as product}
      <a href="/products/{product.id}" class="fields">
        <div>{product.id}</div>
        <div>{product.product_description}</div>
      </a>
    {/each}
  </section>
{/if}

</div>


<style>
.root {
  position: relative;
  flex-grow: 1;
  display: flex;
  height: 100%;
}
.categories {
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  flex-basis: 100%;
}

.fields {
  width: 100%;
  display: flex;
  margin-bottom: 5px;
  border: 1px solid #c3c3c3;
}

.fields-descriptor {
  border: none;
  border-bottom: 1px solid #c3c3c3;
}

.fields > * {
  flex-basis: 33%;
  padding: 25px;
  position: relative;
}

.expander {
  position: absolute;
  right: 5px;
}

button {
  background: none;
  text-align: left;
  cursor: pointer;
}

.slider {
  z-index: 1;
  height: 100%;
  background-color: #ffffff;
  overflow-y: scroll;
  flex-basis: 45%;

  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.slider::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.slider-header {
  display: flex;
  justify-content: space-between;
}

.slider-close {
  border: none;
}
</style>
