<script lang=ts context=module>
	import { sanity, urlFor } from "$lib/sanityClient";
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ url }) {
		const query = `*[_type == 'settings'][0]{ globalSeo, siteTitle }`
		const data = await sanity.fetch(query);
	
		return {
			props: { data, url }
		};
	}
</script>
<script lang=ts>
	import '../app.css'
	import { inviteToken, inviteRefreshToken } from '$lib/stores/invite';
	import { resetToken, resetRefreshToken } from '$lib/stores/reset';
	import SvelteSeo from 'svelte-seo'
	import Favicon from '$lib/components/Favicon.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { page, session } from '$app/stores'
	import { client } from '$lib/authClient'
  import { browser } from '$app/env'

	export let data
	export let url

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

	$:console.log({'data': data.globalSeo, 'url': url})

	$:({ globalSeo, siteTitle } = data)
	$: pagePathname = url.pathname.replace('/', '')
	$: pageTitle = capitalize(pagePathname)

	$: if ($page.url.hash) {
  	const params = new URLSearchParams(`?${$page.url.hash.slice(1)}`);
		const type = params.get('type');

		const token = params.get('access_token');
		const refresh = params.get('refresh_token')

		switch (type) {
			case 'recovery':
				$resetToken = token;
				$resetRefreshToken = refresh;
				break;

			case 'invite':
				$inviteToken = token;
				$inviteRefreshToken = refresh;
		}
	}
	
	if(browser){
		$session = client.auth.session();
		
		client.auth.onAuthStateChange((event, s) => {
			console.log(`AUTH_STATE_CHANGE: ${event}`)
			$session = s
		});
	}
</script>

<SvelteSeo 
  title={`${siteTitle} | ${pageTitle}`}
  description={globalSeo.description}
  openGraph={{
    title: `${siteTitle} | ${globalSeo.title}`,
    description: globalSeo.description,
    url: `https://www.stcroixpublishing.com${url.pathname}`,
    type: 'website',
    images: [
      {
        url: urlFor(globalSeo.image).width(850).height(650).url(),
        width: 850,
        height: 650,
        alt: 'St. Croix Publishing'
      }
     ]
  }}
/>

<Favicon />
<Header />
	<main class="container-full">
		<slot />
	</main>
<Footer />

<style>
	main {
		padding: 0 clamp(5px, 1vw, 100px);
	}
</style>