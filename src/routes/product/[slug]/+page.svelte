<script lang="ts">
  import DetailView from "$lib/components/DetailView.svelte";
  export let data;
</script>

<DetailView headerName="Product properties" object={data.product} />
