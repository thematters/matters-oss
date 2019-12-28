import { ApolloError } from 'apollo-client'

export const getErrorCodes = (error: ApolloError) => {
  const errorCodes: string[] = []

  if (!error || !error.graphQLErrors) {
    return errorCodes
  }

  error.graphQLErrors.forEach(e => {
    const code = e.extensions && e.extensions.code
    if (code) {
      errorCodes.push(code)
    }
  })

  return errorCodes
}
