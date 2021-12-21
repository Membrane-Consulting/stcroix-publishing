import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const id = import.meta.env.VITE_SANITY_PROJECT_ID.toString()
const readToken = import.meta.env.VITE_SANITY_READ_TOKEN.toString()

const sanity = sanityClient({
  projectId: id,
  dataset: 'production',
  apiVersion: '2021-03-25',
  token: readToken,
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

const urlFor = (source:SanityImageSource):ImageUrlBuilder => {
  return builder.image(source)
}

export { sanity, urlFor }
