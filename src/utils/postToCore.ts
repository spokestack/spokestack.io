interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: { [key: string]: any } | string
}

export default function postToCore(url: string, options?: RequestOptions) {
  options = {
    ...options,
    method: 'POST'
  }
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  }
  if (options.body) {
    options.body = JSON.stringify(options.body)
  }
  if (!process.env.PYLON_CORE_URL) {
    throw new Error('PYLON_CORE_URL is not set in the environment.')
  }
  return fetch(`${process.env.PYLON_CORE_URL}${url}`, options as RequestInit)
    .then((response) => {
      if (response.ok) {
        return [null, response]
      }
      return [response]
    })
    .catch((error) => [error])
}
