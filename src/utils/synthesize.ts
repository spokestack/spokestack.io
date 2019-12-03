import { login } from './auth'
import postToCore from './postToCore'
import sanitizeIPA from './sanitizeIPA'

export default async function synthesize(voice: string, text: string) {
  const [loginError, token] = await login()
  if (loginError || !token) {
    return [new Error('Failed to generate auth token')]
  }
  if (!(text = sanitizeIPA(text))) {
    return [new Error('The text is not valid IPA. Please double check the brackets.')]
  }
  const [synthError, res] = await postToCore('/speech/v1/showcase/synthesize', {
    headers: {
      Authorization: token
    },
    body: { voice, text }
  })
  if (synthError) {
    return [synthError]
  }
  return res
    .json()
    .then((json: any) => [null, json])
    .catch((error: Error) => {
      console.log(error, res)
      return [new Error('Error parsing JSON response')]
    })
}
