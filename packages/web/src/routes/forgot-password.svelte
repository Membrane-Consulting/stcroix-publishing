<script lang=ts>
  import { goto } from '$app/navigation';
  import { forgot } from '$lib/authClient'

  let email;
</script>

<div class="page-container">
  <div class="modal-form">
    <h1>Request a Password Reset</h1>
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
        <input 
          type="submit" 
          value="Submit"
          on:click|preventDefault={() => forgot(email)}
        >
    </form>
  </div>
</div>

<style>

</style>