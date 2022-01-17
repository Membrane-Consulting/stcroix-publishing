<script lang=ts>
  import {urlFor} from '$lib/sanityClient'
  import type { Image } from '@sanity/types'
  export let image:Image
  export let maxWidth = 1200
  export let alt = undefined
  export let style = undefined
  // Example image document ID: image-cc93b69600f5cd1abce97fd0d4aa71793dbbba76-1350x900-png
  // Structure: image-${storedImgId}-${dimensions}-${format}
  // If we split it by "-", the 3rd element are the dimensions (1350x900)
  $: dimensions = image?.asset?._ref?.split('-')[2]
  // If we split dimensions by "x", we get the width (1350) and height (900)
  $: [width, height] = dimensions.split('x').map(Number)
  $: aspectRatio = width / height
  // Once loaded, the image will transition to full opacity
  $: loaded = false;
</script>
{#if image}
  <img
    loading="lazy"
    src={urlFor(image).width(maxWidth).fit('fillmax').url()}
    alt={alt || image.alt || ''}
    style={`aspect-ratio: ${aspectRatio}; opacity: ${loaded ? 1 : 0}; transition: .1s opacity; ${style}`}
    on:load={() => (loaded = true)}
  />
{/if}

<style>
  img {
    border-radius: 40px;
  }  
</style>