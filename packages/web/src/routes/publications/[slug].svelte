<script lang=ts context=module>
  import buildUrl from '$lib/utils/buildUrl'
  
  // Pre-render
  export const prerender = true;

  /**
    * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ page, fetch, session, context }) {
    const { slug } = page.params
    const query = `*[_type=="textbook" && slug.current=="${slug}"][0]{ title, subtitle, author, pubYear, exerpt, "pdfURL": pdf.asset->url}`;
    const res = await fetch(buildUrl(page, query));
  
  if (res.ok) {
    return {
      props: {
        data: await res.json()
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
  import { siteTitle } from '$lib/utils/siteTitle'
  import { session } from '$app/stores'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { browser } from '$app/env'

  export let data

  let articleWidth

  $: if(browser && !$session?.user){
      goto('/login')
  }
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
  <meta name="AdsBot-Google" content="noindex" />
  <title>{`${$siteTitle} | ${data.title}`}</title>
</svelte:head>

{#if $session.user}
  <article class="container-tight" bind:clientWidth={articleWidth}>
    <h1>{data.title}</h1>
    <h2>{data.subtitle}</h2>
    <div class="meta">
      <span>{data.author}</span>
      <span>{data.pubYear}</span>
    </div>
    <PortableText blocks={data.exerpt}/>
    <object
        id="myPDF" 
        title={data.title}
        data={data.pdfURL} 
        type="application/pdf"
        width={articleWidth}
        height="1000"
      ></object>
      <span class="border"></span>
  </article>
{:else}
  <h1>not authenticated</h1>
{/if}

<style>
  article { position: relative; }
  .border {
    width: calc(100% - 3rem);
    border-bottom: 5px solid var(--black);
    position: absolute;
    bottom: 0;
    left: 1.5rem;

  }
  article .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 1.2rem;
  }
  #myPDF {
    padding: 0 3rem 0 0;
    /* border-bottom: 5px solid #000; */
    --main-color: #000 !important;
    --body-bg-color: #fff !important;
    --scrollbar-bg-color: #fff !important;
    --toolbar-icon-bg-color: #000 !important;
    --toolbar-icon-hover-bg-color: #000 !important;
    --sidebar-toolbar-bg-color: #fff !important;
    --toolbar-bg-color: #fff !important;
    --button-hover-color: rgba(12, 12, 13, 1) !important;
    --dropdown-btn-bg-color: #fff !important;
    --field-color: #000 !important;
    --field-bg-color: #fff !important;
  }
</style>