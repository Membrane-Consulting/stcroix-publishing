<script lang=ts context=module>
  import buildUrl from '$lib/utils/buildUrl'
  import { homePageQuery } from '$lib/utils/queries';
  /**
   * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ url, fetch }) {
    const query = homePageQuery;
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
<script lang=ts>
  import PortableText from '@portabletext/svelte'
  import { siteTitle } from '$lib/utils/siteTitle'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import type { HomePage } from '$lib/utils/types'
  
  export let data:HomePage
</script>

<svelte:head>
  <title>{$siteTitle}</title>
</svelte:head>

<section class="container">
  <div id="hero-img">
    <SanityImage image={data.heroImage}/>
  </div>
  <article class="modal-card">
      <h2>{data.heroHeading}</h2>
      <p>{data.heroText}</p>
      <div class="key-points">
        {#each data.keyPoints as p}
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
              <g id="Group_23" data-name="Group 23" transform="translate(-849 -912)">
                <circle id="Ellipse_1" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(849 912)" fill="#d1fae5"/>
                <path id="Icon_feather-check" data-name="Icon feather-check" d="M18.019,9,9.756,17.263,6,13.507" transform="translate(851.991 913.369)" fill="none" stroke="#214729" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </g>
            </svg>
            {p}
          </span>
        {/each}
      </div>
    </article>
</section>

<section class="container">
  <div id="hero-img">
    <SanityImage image={data.featuredImage}/>
  </div>
  <article class="modal-card">
      <h2>{data.featuredText.title}</h2>
      <h3>{data.featuredText.subtitle}</h3>
      <div class="meta">
        <span>{data.featuredText.author}</span>
        <span>{data.featuredText.pubYear}</span>
      </div>
      <PortableText blocks={data.featuredText.exerpt}/>
      <a href='/publications' class="button-block">Browse Texts</a>
    </article>
</section>