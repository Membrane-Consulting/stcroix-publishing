<script lang=ts>
	import '../app.css'
	import Favicon from '$lib/components/Favicon.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { client } from '$lib/authClient'
	import { resetToken, resetRefreshToken } from '$lib/stores/reset';
  import { session } from '$app/stores'
  import { browser } from '$app/env'
	
	if(browser){
		const hashType:string = new URLSearchParams(window.location.hash).get('type')
		if (hashType === 'recovery'){
			resetToken.set(new URLSearchParams(window.location.hash).get('access_token'))
			resetRefreshToken.set(new URLSearchParams(window.location.hash).get('refresh_token'))
		}
    $session = client.auth.session()
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