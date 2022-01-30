<script lang=ts context=module>
  import buildUrl from '$lib/utils/sanity'

  // Pre-render
  export const prerender = true;

   /**
    * @type {import('@sveltejs/kit').Load}
    */
   export async function load({ url, fetch }) {
     const query = `*[_type == 'aboutPage'][0]`;
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
  import ImageBlock from '$lib/components/ImageBlock.svelte'
  import Seo from '$lib/components/Seo.svelte'
  
  export let data
</script>

  <Seo data={data.seo}/>

  <section class="container-tight">
    <h1>{data.heading}</h1>
    <PortableText 
      blocks={data.textContent}
      serializers={{
        types: {
          image: ImageBlock,
        },
      }}
    />
  </section>

<style>
  
</style>