import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      auth
      token
    }
  }
`

type AuthResult = {
  auth: boolean
  token: string
}

type Response = {
  userLogin: AuthResult
}

type InputProps = any

type Variables = {
  input: {
    email: string
    password: string
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withUserLogin = graphql<
  InputProps,
  Response,
  Variables,
  ChildMutateProps
>(USER_LOGIN)

export default withUserLogin
