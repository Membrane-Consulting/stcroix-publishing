<script lang=ts context=module>
  import buildUrl from '$lib/utils/sanity'

  // Pre-render
  export const prerender = true;

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ url, fetch, session, context }) {
    const query = `*[_type == 'settings'][0]{termsOfService, _updatedAt}`;
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
   import Link from '$lib/components/Link.svelte'

   export let data
</script>

<section class="container-tight">
  <h1>Terms of Service</h1>
  <p>Last updated {new Date(data._updatedAt).toDateString()}</p>
  <PortableText 
    blocks={data.termsOfService}
    serializers={{
    types: {
      image: ImageBlock,
    },
    marks: {
      link: Link
    }
  }}
  />
</section>

<style>

</style>
