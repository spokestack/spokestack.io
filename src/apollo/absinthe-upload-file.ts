import { ApolloLink, concat } from 'apollo-link'

import { HttpLink } from 'apollo-link-http'
import { Observable } from 'apollo-link'
import extractFiles from './extractFiles'
import { isObject } from './validators'
import { parseAndCheckHttpResponse } from 'apollo-link-http-common'
import { print } from 'graphql/language/printer'

export const createUploadMiddleware = ({
  uri,
  headers,
  fetch,
  credentials
}: HttpLink.Options) =>
  new ApolloLink((operation, forward) => {
    if (typeof FormData !== 'undefined' && isObject(operation.variables)) {
      const { variables, files } = extractFiles(operation.variables)

      if (files.length > 0) {
        const context = operation.getContext()
        const { headers: contextHeaders } = context
        const formData = new FormData()

        formData.append('query', print(operation.query))
        formData.append('variables', JSON.stringify(variables))
        files.forEach(({ name, file }) => formData.append(name, file))

        let options = {
          method: 'POST',
          headers: Object.assign({}, contextHeaders, headers),
          body: formData,
          credentials
        }

        // add context.fetchOptions to fetch options
        options = Object.assign(context.fetchOptions || {}, options)

        // fetch is required
        return new Observable((observer) => {
          fetch(uri as string, options as RequestInit)
            .then((response) => {
              operation.setContext({ response })
              return response
            })
            .then(parseAndCheckHttpResponse(operation))
            .then((result) => {
              // we have data and can send it to back up the link chain
              observer.next(result)
              observer.complete()
              return result
            })
            .catch((err) => {
              if (err.result && err.result.errors && err.result.data) {
                observer.next(err.result)
              }
              observer.error(err)
            })
        })
      }
    }

    return forward(operation)
  })

export const createLink = (opts: HttpLink.Options) =>
  concat(createUploadMiddleware(opts), new HttpLink(opts))
