// https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
const remail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// Also used on the server
export default function validateEmail(email: string) {
  return remail.test(email)
}
