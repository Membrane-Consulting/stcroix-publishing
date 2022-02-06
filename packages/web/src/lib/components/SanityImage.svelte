<script lang=ts>
  import {urlFor} from '$lib/sanityClient'
  import type { Image } from '@sanity/types'
  import { browser } from '$app/env'
  import { onMount } from 'svelte'

  // interface AccessibleImage extends Image {
  //   alt: string
  // }

  export let image:Image
  export let maxWidth:number = 1200
  export let alt:string = undefined
  export let style:string = undefined

  $: dimensions = image?.asset?._ref?.split('-')[2]
  $: [width, height] = dimensions.split('x').map(Number)
  $: aspectRatio = width / height

  let imageRef

  $: loaded = false;

  onMount(() => {
    imageRef.onload = () => {
      loaded = true
    }
  }) 
</script>
{#if browser && image}
  <img
    loading="lazy"
    src={urlFor(image).width(maxWidth).fit('fillmax').url()}
    alt={alt|| ''}
    class:loaded
    bind:this={imageRef}
    style="aspect-ratio: {aspectRatio}; {style ? style : ''}"
  />
{/if}

<style> 
  img {
    border-radius: 40px;
    opacity: 0;
    transition: opacity 100ms ease-out;
  }
  img.loaded {
    opacity: 1;
  }
</style>