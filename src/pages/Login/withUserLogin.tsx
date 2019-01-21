import { graphql, ChildMutateProps } from 'react-apollo'
import { FormComponentProps } from 'antd/lib/form'

import MutationUserLogin from '../../gql/mutations/userLogin.gql'

type AuthResult = {
  auth: boolean
  token: string
}

type Response = {
  userLogin: AuthResult
}

type InputProps = FormComponentProps

type Variables = {
  input: {
    email: string
    password: string
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withUserLogin = graphql<InputProps, Response, Variables, ChildProps>(
  MutationUserLogin
)

export default withUserLogin
