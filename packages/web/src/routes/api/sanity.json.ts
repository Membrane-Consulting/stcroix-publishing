import sanityClient from '@sanity/client'
import { sanity } from '$lib/sanityClient'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }){
  const query = url.search
  const items:URLSearchParams = new URLSearchParams(query)

  for (const [key, value] of items){
    if (key === 'query'){
      const res = await sanity.fetch(value)
      return {
        status: 200,
        body: res
      }
    } else {
      return {
        status: 500,
        body: 'Incorrect Query Parameters'
      }
    }
  }

  return {
    status: 500,
    body: 'Query Failed'
  }

}

