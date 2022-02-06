<script lang=ts>
  import { resetToken } from '$lib/stores/reset'
  import { updateUser } from '$lib/authClient'
  import { goto } from '$app/navigation';

  if (!$resetToken) {
    goto('/')
  }

  let password;
  let working;

  async function update() {
    if (password.trim() == '') return;

    working = true;

    try {
      await updateUser(password, $resetToken);
      goto('/login');
    }
    catch (e) {
      console.error('password update error', e);
      working = false;
    }
  }
</script>

<div class="page-container">
  <div class="modal-form">
    <h1>Reset your Password</h1>
    <form on:submit|preventDefault={update}>
      <div class="input-wrap">
        <input 
          type="password" 
          name="password" 
          bind:value={password}
          placeholder="Your new password" 
          required
        >
        <span></span>
      </div>
        <input 
          type="submit" 
          value="Submit"
          disabled={working}
        >
    </form>
  </div>
</div>

<style>

</style>
