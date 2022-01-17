import type { PortableTextBlocks } from '@portabletext/svelte/ptTypes';
import type { Image, Block, Slug } from '@sanity/types'

type TextBook = {
  title: string
  subtitle: string
  author: string
  exerpt: PortableTextBlocks
  pubYear: Block
  slug: Slug
}

export type HomePage = {
  heroImage:Image
  heroHeading: string
  heroText: string
  keyPoints: string[]
  featuredText: TextBook,
  featuredImage: Image
}