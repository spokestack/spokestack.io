interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: { [key: string]: any } | string
}

export default function postToCore(url: string, options?: RequestOptions) {
  if (!process.env.PYLON_CORE_URL) {
    throw new Error('PYLON_CORE_URL is not set in the environment')
  }
  options = {
    ...options,
    method: 'POST'
  }
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  }
  return fetch(`${process.env.PYLON_CORE_URL}${url}`, options as RequestInit)
    .then((response) => {
      if (response.ok) {
        return [null, response]
      }
      return [
        new Error(
          `Sorry, there was a problem with the request: ${response.status}`
        )
      ]
    })
    .catch((error) => [error])
}
