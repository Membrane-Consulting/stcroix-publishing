import type { MessageContent } from '$lib/types/email'
import type { RequestEvent } from '@sveltejs/kit'
import mail from '@sendgrid/mail'

export async function post({ request }: RequestEvent) {
  const data = await request.formData();

  mail.setApiKey(process.env["SENDGRID_API_KEY"])

  const address = import.meta.env.VITE_EMAIL_ADDRESS.toString()

  const msg: MessageContent = {
    to: address,
    from: address,
    subject: `New Account Request from ${data.get("name")} at ${data.get("institution")}`,
    text: `New Account Request from ${data.get("name")} - ${data.get("role")} at ${data.get("institution")} Email: ${data.get("email")}`,
    html: `
      <p>New Account Request from ${data.get("name")}</p>
      <p>${data.get("role")} at ${data.get("institution")}</p>
      <p>Email: ${data.get("email")}</p>
    `,
  }

  try {
    await mail.send(msg);

    return {
      status: 302,
      headers: {
        Location: '/request?status=success'
      }
    };
  }
  catch (error) {
    return {
      status: 500,
      headers: {
        Location: '/request?status=error'
      },
      body: { error },
    }
  }
}