<script lang=ts>
  import { page } from '$app/stores'
  $: status = $page.url.searchParams.get("status")
</script>

<div class="page-container">
  <div class="modal-form">
    <h1>Request an instructor account.</h1>
    <form method="POST" action="/api/request">
      <div class="input-wrap">
        <input 
          type="text" 
          name="name"
          placeholder="Your Name" 
          required
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          required 
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="text" 
          name="institution" 
          placeholder="Your Institution" 
          required
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <label for="role">What is your job title?</label>
        <select 
          name="role" 
          placeholder="Your job title" 
          required
        >
          <option value="Adjunct Faculty">Adjunct Faculty</option>
          <option value="Assistant Professor">Assistant Professor</option>
          <option value="Tenured Professor">Tenureed Professor</option>
        </select>
        <span></span>
      </div>

      {#if status === 'success'}
        <input type="submit" value="Request Sent!">
      {:else if status === 'error'}
        <input type="submit" value="Error, please try again.">
      {:else}
        <input type="submit" value="Request">
      {/if}
    </form>
    <a class="tiny-text" href="/login">Already have an account? Login here.</a>
  </div>
</div>

<style>

</style>