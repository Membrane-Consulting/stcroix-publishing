<script lang=ts context=module>
  import buildUrl from '$lib/utils/sanity'

  /**
    * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ url, params, fetch, session, context }) {
    const { slug } = params
    const query = `*[_type=="textbook" && slug.current=="${slug}"][0]{ title, subtitle, author, pubYear, exerpt, "pdfURL": pdf.asset->url}`;
    const res = await fetch(buildUrl(query));
  
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
  import { session } from '$app/stores'
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
</svelte:head>

{#if $session.user}
  <article class="container-tight" bind:clientWidth={articleWidth}>
    <h1>{data.title}</h1>
    {#if data.subtitle}
      <h2>{data.subtitle}</h2>
    {/if}
    <div class="meta">
      <span>{data.author}</span>
      <span>{data.pubYear}</span>
    </div>
    <PortableText blocks={data.exerpt}/>
      <iframe 
        src={`${data.pdfURL}#toolbar=0&navpanes=0`} 
        id="myPDF" 
        title={data.title}
        frameborder="0"
        type="application/pdf"
        width={articleWidth}
        height="1000px"
        on:contextmenu={(e) => e.preventDefault()}
      ></iframe>
  </article>
{:else}
  <h1>not authenticated</h1>
{/if}

<style>
  article { position: relative; }
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