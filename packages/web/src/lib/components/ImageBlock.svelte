<script>
  import SanityImage from './SanityImage.svelte'
  export let portableText
  $: ({block} = portableText);
</script>

{#if block.asset}
  <figure>
    <SanityImage image={block} />
    {#if block.caption}
      <figcaption>{block.caption}</figcaption>
    {/if}
  </figure>
{/if}

<style>
  figure {
    margin: 2rem 0;
  }
</style>