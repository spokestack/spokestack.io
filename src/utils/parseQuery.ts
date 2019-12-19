/**
 * Query or hash string from window.location
 */
export default function parseQuery(queryString: string) {
  const params = queryString.slice(1).split('&')
  const query: { [key: string]: string } = {}
  params.forEach((param) => {
    const [key, value] = param.split('=')
    if (key && value) {
      query[key] = value
    }
  })
  return query
}
