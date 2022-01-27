import { updateUser } from "$lib/authClient";
import { resetToken } from "$lib/stores/reset";
import { login } from "$lib/authClient"

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function post({ body }) {
  const email = body.get("email")
  const password = body.get("password")
  
  let token
  resetToken.subscribe(value => token = value)

  try {
    if (token){
      await updateUser(password, token)
      await login(email, password)
    }
  } catch (e) {
    console.log(e)
    return {
      status: 500,
      body: {
        message: "Error while updating User"
      }
    }
  }

	return {
    status: 302,
    headers: {
      Location: '/publications'
    }
  };
}