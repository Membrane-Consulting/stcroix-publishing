<script lang=ts context=module>
  import buildUrl from '$lib/utils/sanity';
  
  // Pre-render
  export const prerender = true;
  
  /**
    * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ url, fetch, session, context }) {
    const pageQuery = `*[_type == 'textsPage'][0]`;
    const res = await fetch(buildUrl(pageQuery));
    const itemsQuery = `*[_type == 'textbook']{title, subtitle, author, pubYear, exerpt, slug}`
    const items = await fetch(buildUrl(itemsQuery))
  
  if (res.ok && items.ok) {
    return {
      props: {
        page: await res.json(),
        items: await items.json()
      }
    };
  }
  
  return {
    status: res.status,
      error: new Error(`Could not load url`)
    };
  }
</script>
<script lang=ts>
  import PortableText from '@portabletext/svelte'
  // import Seo from '$lib/components/Seo.svelte'
  import { session } from '$app/stores'
  
  export let page
  export let items
</script>

<!-- <Seo data={page.seo}/> -->

<section class="container-tight">
  <h1>{page.heading}</h1>
  <PortableText blocks={page.textContent}/>
  {#each items as i}
    <article class="modal-card">
      <h2>{i.title}</h2>
      <h3>{i.subtitle}</h3>
      <div class="meta">
        <span>{i.author}</span>
        <span>{i.pubYear}</span>
      </div>
      <PortableText blocks={i.exerpt}/>
      {#if $session?.user}
        <a href={`/publications/${i.slug.current}`} class="button-block">View Text</a>
      {/if}
    </article>
  {/each}
</section>

<style>
</style>