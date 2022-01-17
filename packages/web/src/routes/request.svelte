<script lang=ts>
  type RequestPayload = {
    name: string
    email: string
    institution: string
    role: ''
  }

  let payload:RequestPayload = {
    name: undefined,
    email: undefined,
    institution: undefined,
    role: undefined,
  }
</script>

<div class="page-container">
  <div class="modal-form">
    <h1>Request an instructor account.</h1>
    <form method="POST">
      <div class="input-wrap">
        <input 
          type="text" 
          name="name"
          placeholder="Your Name" 
          required 
          bind:value={payload.name}
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          required 
          bind:value={payload.email}
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <input 
          type="text" 
          name="institution" 
          placeholder="Your Institution" 
          required 
          bind:value={payload.institution}
        >
        <span></span>
      </div>
      <div class="input-wrap">
        <label for="role">What is your job title?</label>
        <select 
          name="role" 
          placeholder="Your job title" 
          required 
          bind:value={payload.role}
        >
          <option value="Adjunct Faculty">Adjunct Faculty</option>
          <option value="Assistant Professor">Assistant Professor</option>
          <option value="Tenured Professor">Tenureed Professor</option>
        </select>
        <span></span>
      </div>

        <input 
          type="submit"
          value="Request"
          on:click|preventDefault={() => {}}
        >
      
    </form>
    <a class="tiny-text" href="/login">Already have an account? Login here.</a>
  </div>
</div>

<style>

</style>