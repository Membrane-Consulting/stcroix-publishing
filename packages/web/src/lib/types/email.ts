export type MessageContent = {
    to: string
    from: string
    subject: string
    text: string
    html: string
  }

export type ContactPayload = {
    email: string,
    name: string,
    institution: string,
    message: string,
  }