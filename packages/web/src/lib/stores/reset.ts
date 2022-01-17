import { writable } from "svelte/store";

export const resetToken = writable(undefined)
export const resetRefreshToken = writable(undefined)