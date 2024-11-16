<script lang="ts">
  export let href: string;
</script>

<a
  class="m-3 block flex items-center justify-center p-2 text-dovegray hover:rounded-md hover:bg-silver hover:text-black hover:transition-colors hover:ease-in-out"
  {href}
>
  <slot />
</a>
