<script lang=ts context=module>
   import buildUrl from '$lib/utils/buildUrl';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ url, fetch, session, context }) {
    const query = `*[_type=='purchaseOrderPage'][0]`
    const res = await fetch(buildUrl(url, query));

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
<script>
  import Seo from '$lib/components/Seo.svelte'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import { page } from '$app/stores'

  $: status = $page.url.searchParams.get("status")

  export let data
</script>

<Seo data={data.seo}/>

<section class="page-container">
  <SanityImage image={data.image} style={'max-width:500px; border-radius: 40px;'}/>
  <div class="modal-form" style="margin: 0;">
    <h1>{data.formHeading}</h1>
    <form action="/api/order" method="POST" enctype="multipart/form-data">
      
      <div class="input-wrap">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          required 
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          required 
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="file" 
          name="file" 
          placeholder="Purchase Order" 
          accept="application/pdf"
          required 
        >
        <p>(PDF only)</p>
        <span></span>
      </div>
      <div class="input-wrap">
        <textarea
          name="comments" 
          placeholder="Additional Comments"
        />
        <span></span>
      </div>
      {#if status === 'success'}
        <input type="submit" value="Message Sent!">
      {:else if status === 'error'}
        <input type="submit" value="Error, please try again.">
      {:else}
        <input type="submit" value="Send">
      {/if}
      
  </div>
</section>

<style>
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }
  h1 {
    max-width:80%;
  }
  label {
    display: none;
  }
</style>