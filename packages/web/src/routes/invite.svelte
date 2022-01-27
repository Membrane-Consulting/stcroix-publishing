<script lang=ts>
  import { browser } from "$app/env";
  import { inviteToken } from "$lib/stores/invite"
  import { updateUser } from "$lib/authClient"

  let password = undefined
</script>

<div class="page-container">
  <div class="modal-form">
    <h1>Set your Password</h1>
    <form method="POST">
      <div class="input-wrap">
        <input 
          type="password" 
          name="password" 
          placeholder="Your password" 
          required 
          bind:value={password}
        >
        <span></span>
      </div>
        <input 
          type="submit" 
          value="Submit"
          on:click|preventDefault={() => updateUser(password, $inviteToken)}
        >
    </form>
  </div>
</div>

<style>

</style>