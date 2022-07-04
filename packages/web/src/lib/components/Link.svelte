<script>
  export let portableText
</script>

<a href={portableText.mark.href} target="_blank">
  <slot />
</a>

<style>
  a {
    text-decoration: underline;
  }
</style>
