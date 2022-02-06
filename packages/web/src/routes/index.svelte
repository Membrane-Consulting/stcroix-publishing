<script lang=ts context=module>
  import buildUrl from '$lib/utils/sanity'
  import { homePageQuery } from '$lib/utils/queries';
  /**
   * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ url, fetch }) {
    const query = homePageQuery;
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
  import { session } from '$app/stores'
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
  <div class="hero-img">
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
  <h2 class="featured-title">Featured Text</h2>
  <div class="hero-img">
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
      {#if $session?.user}
        <a href='/publications' class="button-block">Browse Texts</a>
      {/if}
    </article>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "img" "card";
  }

  section:last-of-type {
    grid-template-areas: "_" "img" "card";
  }

  .featured-title {
    grid-area: _; 
    font-style: italic; 
    font-size: 2.4rem;
    margin: 2rem;
    justify-self: center;
  }

  .hero-img {
    grid-area: img;
    border-radius: 40px;
    max-height: 400px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  article {
    grid-area: card;
    margin-top: -20%;
  }

  .key-points {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: .25fr .25fr;
    gap: 1rem;
  }
  .key-points > span {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1rem;
  }

  @media screen and (min-width: 900px){
    section {
      grid-template-columns: 1fr 400px 1fr;
      grid-template-areas: "img img _" "__ card card";
    }

    section:last-of-type {
      grid-template-areas: "_ img img" "card card __";
    }

    article {
      margin-top: -40%;
    }
  }
</style>