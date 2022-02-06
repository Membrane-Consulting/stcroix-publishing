<script lang=ts>
  import { siteTitle } from '$lib/utils/siteTitle'
  import { urlFor } from '$lib/sanityClient'
  import type { Image } from '@sanity/types'

  type MetaData = {
    title: string
    description?: string
    image?: Image,
    url?: string
  }

  export let data:MetaData

  let fullTitle

  $:(fullTitle = `${$siteTitle} | ${data.title}`) 
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta property="og:title" content={fullTitle} />
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