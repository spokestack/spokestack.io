interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: { [key: string]: any } | string
}

const coreUrl = 'https://core.pylon.com'

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
  return fetch(`${coreUrl}${url}`, options as RequestInit)
    .then((response) => {
      if (response.ok) {
        return [null, response]
      }
      return [response]
    })
    .catch((error) => [error])
}
