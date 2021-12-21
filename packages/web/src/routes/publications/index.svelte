<script lang=ts context=module>
   /**
    * @type {import('@sveltejs/kit').Load}
    */
   export async function load({ page, fetch, session, context }) {
     const url = `api`;
     const res = await fetch(url);
   
   if (res.ok) {
     return {
       props: {
          propName: await res.json()
       }
     };
   }
   
   return {
     status: res.status,
       error: new Error(`Could not load url`)
     };
   }
</script>
<script lang=ts>

</script>

<style>

</style>