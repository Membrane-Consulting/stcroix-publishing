import mail from '@sendgrid/mail'
import type { MessageContent } from '$lib/types/email'

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function post({ body }) {

  await mail.setApiKey(process.env["SENDGRID_API_KEY"])

  const address = import.meta.env.VITE_EMAIL_ADDRESS.toString()

  const msg:MessageContent = {
    to: address,
    from: body.get("email"),
    subject: `New Contact Form Submission from ${body.get("name")} at ${body.get("institution")}`,
    text: body.get("message"),
    html: `<p>${body.get("message")}</p>`,
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
          Location: '/contact?status=error'
        },
        body: { error },
      }
    })

	return {
    status: 302,
    headers: {
      Location: '/contact?status=success'
    }
  };
}