<script lang=ts>
	import '../app.css'
	import { inviteToken, inviteRefreshToken } from '$lib/stores/invite';
	import { resetToken, resetRefreshToken } from '$lib/stores/reset';
	import Favicon from '$lib/components/Favicon.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { page, session } from '$app/stores'
	import { client } from '$lib/authClient'
  import { browser } from '$app/env'

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