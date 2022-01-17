import mail from '@sendgrid/mail'

export type MessageContent = {
  to: string
  from: string
  subject: string
  text: string
  html: string
}

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function post({ body }) {

  const {to, from, subject, text, html} = body

  await mail.setApiKey(process.env["SENDGRID_API_KEY"])

  const msg:MessageContent = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
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
        body: { error },
      }
    })

	return {
    status: 200,
    body: {},
  };
}