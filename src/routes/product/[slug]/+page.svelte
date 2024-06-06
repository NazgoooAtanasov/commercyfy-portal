<script lang="ts">
  import DetailView from "$lib/components/DetailView.svelte";
  export let data;
</script>

<DetailView object={data.product} />
