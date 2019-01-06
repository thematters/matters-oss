import * as React from 'react'
import { graphql, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'

const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      auth
      token
    }
  }
`

export type AuthResult = {
  auth: boolean
  token: string
}

export type Response = {
  userLogin: AuthResult
}

export type Variables = {
  input: {
    email: string
    password: string
  }
}

const withUserLogin = graphql<{}, Response, Variables>(USER_LOGIN)

export default withUserLogin
