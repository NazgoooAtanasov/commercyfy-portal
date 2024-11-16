<script lang="ts">
  const breadcrumbs = ["Dashboard", "Products"];
</script>

<div class="mb-8 flex text-dovegray">
  {#each breadcrumbs as breadcrumb, idx}
    <dev class="last:text-black"> {breadcrumb} </dev>
    {#if idx < breadcrumbs.length - 1}
      <span class="ml-3 mr-3"> / </span>
    {/if}
  {/each}
</div>
