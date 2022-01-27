import mail from '@sendgrid/mail'
import type { MessageContent } from '$lib/types/email'

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function post({ body }) {

  await mail.setApiKey(process.env["SENDGRID_API_KEY"])

  const address = import.meta.env.VITE_EMAIL_ADDRESS.toString()

  const msg:MessageContent = {
    to: address,
    from: body.get("email"),
    subject: `New Account Request from ${body.get("name")} at ${body.get("institution")}`,
    text: `New Account Request from ${body.get("name")} - ${body.get("role")} at ${body.get("institution")} Email: ${body.get("email")}`,
    html: `
      <p>New Account Request from ${body.get("name")}</p>
      <p>${body.get("role")} at ${body.get("institution")}</p>
      <p>Email: ${body.get("email")}</p>
    `,
  }

  mail
    .send(msg)
    .then(res => {
      return {
        status: 200,
        body: res,
      };
    })
    .catch((error) => {
      console.error(error)
      return {
        status: 500,
        headers: {
          Location: '/request?status=error'
        },
        body: { error },
      }
    })

	return {
    status: 302,
    headers: {
      Location: '/request?status=success'
    }
  };
}