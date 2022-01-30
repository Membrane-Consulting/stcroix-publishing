<script lang=ts>
  import { inviteToken } from "$lib/stores/invite";
  import { updateUser } from "$lib/authClient"
  import { goto } from '$app/navigation';

  let password;
  let working;

  async function update() {
    if (password.trim() == '') return;

    working = true;

    try {
      await updateUser(password, $inviteToken);
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
    <h1>Set your Password</h1>
    <form on:submit|preventDefault={update}>
      <div class="input-wrap">
        <input 
          type="password" 
          name="password" 
          placeholder="Your password" 
          required
          disabled={working}
          bind:value={password}
        >
        <span></span>
      </div>
        <input 
          type="submit" 
          value="Submit"
        >
    </form>
  </div>
</div>

<style>

</style>