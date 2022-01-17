<script lang=ts>
   
</script>

<footer class="container-full">
  <ul>
    <li><a sveltekit:prefetch href='/publications'>Texts</a></li>
    <li><a sveltekit:prefetch href='/order'>Order</a></li>
    <li><a sveltekit:prefetch href='/about'>About</a></li>
    <li><a sveltekit:prefetch href='/contact'>Contact</a></li>
  </ul>

  <ul>
    <li><a sveltekit:prefetch href='/login'>Instructor Login</a></li>
    <li><a sveltekit:prefetch href='/legal/policy'>Privacy Policy</a></li>
    <li><a sveltekit:prefetch href='/legal/terms'>Terms of Service</a></li>
  </ul>

  <span>© St. Croix Publishing, LLC 2022</span>
</footer>

<style>
  footer {
    border-top: 3px solid var(--black);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "col1""col2""cr";
    font-size: 1rem;
    padding-top: 1rem;
    margin-bottom: 2rem;
  }
  ul {
    list-style: none;
    padding: 0;
    
  }
  li a{
    font-size: 1rem;
  }
  span {
    grid-area: cr;
    justify-self: center;
    margin-top: 1.5rem;
  }
  @media screen and (min-width: 300px){
    footer {
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "col1 col2""cr cr";
    }
    ul:last-of-type {
    text-align: right;
  }
  }
</style>