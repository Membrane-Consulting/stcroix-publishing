import { readable } from 'svelte/store'

export const siteTitle = readable(null, set => set('St. Croix Publishing'));