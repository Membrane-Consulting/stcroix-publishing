<script lang=ts>
  import { page } from '$app/stores'
  import { logout } from '$lib/authClient'
  import { session } from '$app/stores'

  $:active = $page.url.pathname

  const data = [
    {
      name: 'About',
      path: '/about'
    },
    {
      name: 'Texts',
      path: '/publications'
    },
    {
      name: 'Contact',
      path: '/contact'
    }
  ]
</script>

<a class="skip-to-content-link" href="#main">Skip to Content</a>
<header class="container-full">
  <a href="/">
    <img src="/images/logo.svg" alt="St. Croix Publishing's Logo">
  </a>
  <nav>
    <ul>
      {#each data as {name, path}, index}
        <li>
          <a 
            sveltekit:prefetch 
            href={path}
            class={$page.url.pathname.includes(path) ? 'active' : ''}
          >
            {name}
          </a> 
        </li>
        <span>{(index === data.length - 1) ? '' : '|' }</span>
      {/each}
      {#if $session?.user}
        <li>
          <button on:click={() => logout()}>
            logout
          </button>
        </li>
      {/if}
    </ul>
  </nav>
</header>

<style>
  .skip-to-content-link {
  background: var(--blue);
  color: var(--white);
  border: none;
  outline: none;
  border-radius: 0 0 var(--radius) var(--radius);
  height: 40px;
  left: 50%;
  padding: 8px;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.3s;
}

.skip-to-content-link:focus {
  transform: translateY(0%);
  outline: 2px solid var(--blue);
	outline-offset: 2px;
}
  header {
    max-width: 1200px;
    margin: auto;
    padding: 30px clamp(5px, 1vw, 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  header > * {
    margin: auto;
  }
  img {
    /* max-width: 150px; */
    width: clamp(175px, 15vw, 230px);
  }
  nav > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
    list-style: none;
  }
  .active {
    text-decoration: underline;
  }
  a {
    font-family: var(--heading-family);
    font-size:1.2rem
  }
  a:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: 600px){
    img {
      max-width: 175px;

    }
  }

  @media screen and (min-width: 600px){
    header > * {
      margin: 0;
    }
  }
  
</style>