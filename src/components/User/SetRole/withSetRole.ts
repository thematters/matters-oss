import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_ROLE = gql`
  mutation updateUserRole($input: UpdateUserRoleInput!) {
    updateUserRole(input: $input) {
      id
      status {
        role
      }
    }
  }
`

type Response = {
  updateUserRole: {
    status: {
      role: string
    }
  }
}

export type UserRole = 'user' | 'admin'

type InputProps = {
  id: string
  role: UserRole
}

type Variables = {
  input: {
    id: string
    role: UserRole
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetRole = graphql<InputProps, Response, Variables, ChildProps>(
  SET_ROLE
)

export default withSetRole
