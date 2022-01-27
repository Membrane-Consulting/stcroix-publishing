<script lang=ts>
  import { resetToken } from '$lib/stores/reset'
  import { updateUser } from '$lib/authClient'

  let password
</script>

<div class="page-container">
  <div class="modal-form">
    <h1>Reset your Password</h1>
    <form method="POST" action="/api/updateUser">
      <!-- <div class="input-wrap">
        <input 
          type="email" 
          name="email" 
          placeholder="Your email address" 
          required
        >
        <span></span>
      </div> -->
      <div class="input-wrap">
        <input 
          type="password" 
          name="password" 
          placeholder="Your new password" 
          required
          bind:value={password}
        >
        <span></span>
      </div>
        <input 
          type="submit" 
          value="Submit"
          on:click|preventDefault={() => updateUser(password, $resetToken)}
        >
    </form>
  </div>
</div>

<style>

</style>
