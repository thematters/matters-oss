import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_STATE = gql`
  mutation updateUserState($input: UpdateUserStateInput!) {
    updateUserState(input: $input) {
      id
      status {
        state
      }
    }
  }
`

type Response = {
  updateUserState: {
    status: {
      state: string
    }
  }
}

export type UserState =
  | 'active'
  | 'onboarding'
  | 'banned'
  | 'frozen'
  | 'archived'
  | 'null'

type InputProps = {
  id?: string
  state: UserState
  userName?: string
  emails?: string[]
  disabled?: boolean
  batch?: boolean
}

type Variables = {
  input: {
    id?: string
    state: UserState
    banDays?: number
    password?: string
    emails?: string[]
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetState = graphql<InputProps, Response, Variables, ChildProps>(
  SET_STATE
)

export default withSetState
