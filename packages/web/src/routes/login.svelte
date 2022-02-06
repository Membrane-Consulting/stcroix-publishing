<script lang=ts>
  // import Seo from '$lib/components/Seo.svelte'
  import { login } from "$lib/authClient"
  import { session } from "$app/stores"
  import { goto } from "$app/navigation"
  import { browser } from "$app/env"

  const seoData={
    title: 'Instructor Login',
  }

  let email
  let pass

  $:if(browser && $session?.user){
    goto('/publications')
  }
</script>

<!-- <Seo data={seoData}/> -->

<div class="page-container">
  <div class="modal-form">
    <h1>Login to your account.</h1>
    <form method="POST">
      <div class="input-wrap">
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          required 
          bind:value={email}
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="password" 
          name="password" 
          placeholder="Your Password" 
          required 
          bind:value={pass}
        >
        <span></span>
      </div>
      <a class="tiny-text" href="/forgot-password">Forgot your password?</a>
        <input 
          type="submit" 
          value="Login"
          on:click|preventDefault={() => login(email, pass)}
        >
    </form>
    <a class="tiny-text" href="/request">Request an instructor account</a>
  </div>
</div>

<style>
  
</style>