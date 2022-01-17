<script lang=ts context=module>
  import buildUrl from '$lib/utils/buildUrl';

  // Pre-render
  export const prerender = true;

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    const query = `*[_type=='contactPage'][0]`
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
  import Seo from '$lib/components/Seo.svelte'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import { urlFor } from '$lib/sanityClient'
  
  export let data

  let payload = {
    email: undefined,
    name: undefined,
    institution: undefined,
    message: undefined,
  }
</script>

<Seo data={data.seo}/>

<section class="page-container">
  <!-- <img src={urlFor(data.image).url()} alt=""> -->
  <SanityImage image={data.image} style={'max-width:500px; border-radius: 40px;'}/>
  <div class="modal-form" style="margin: 0;">
    <h1>{data.formHeading}</h1>
    <form method="POST">
      <div class="input-wrap">
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          required 
          bind:value={payload.email}
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          required 
          bind:value={payload.name}
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="text" 
          name="institution" 
          placeholder="Your Institution" 
          required 
          bind:value={payload.institution}
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <textarea
          name="message" 
          placeholder="Your Message" 
          required 
          bind:value={payload.message}
        />
        <span></span>
      </div>
      <input 
          type="submit" 
          value="Send"
          on:click|preventDefault={() => {}}
        >
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
</style>

