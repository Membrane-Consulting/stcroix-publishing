import type { Handle, GetSession } from '@sveltejs/kit/types'

export const handle:Handle = async ({ event, resolve }) => { 
  const response = await resolve(event)
  return response
}

export const getSession:GetSession = async (event) => {
    return {
        userAgent: event.request.headers['user-agent']
    }
}