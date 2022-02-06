<script lang=ts>
  import {fade} from 'svelte/transition'
  export let message
</script>

<div transition:fade>
  <span>{message}</span>
</div>

<style>
  div {
    width: 150px;
    padding: 5px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    border: var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    text-align: center;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>