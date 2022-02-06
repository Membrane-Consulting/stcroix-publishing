<script lang=ts>
  import { urlFor } from '$lib/sanityClient'
  import type { Image } from '@sanity/types'

  type MetaData = {
    title?: string
    description?: string
    image?: Image,
    url?: string
  }

  export let data:MetaData = {
    title: ""
  }
</script>

<svelte:head>
  {#if data.title}
    <title>St. Croix Publishing | {data.title}</title>
    <meta property="og:title" content="St. Croix Publishing | {data.title}" />
  {:else}
    <title>St. Croix Publishing</title>
    <meta property="og:title" content="St. Croix Publishing" />
  {/if}
  <meta property="og:type" content="website" />
  {#if data.url}
    <meta property="og:url" content={data.url} />
  {/if}
  {#if data.image}
    <meta property="og:image" content={urlFor(data.image).url()} />
  {/if}
  {#if data.description}
    <meta property="og:description" content={data.description} />
  {/if}
</svelte:head>

<style>

</style>