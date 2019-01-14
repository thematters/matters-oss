import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { UserDetail } from '../../definitions'
import { GQL_FRAGMENT_USER_DETAIL } from '../../gql'

const GET_USER_DETAIL = gql`
  query UserDetail($input: NodeInput!) {
    user: node(input: $input) {
      ... on User {
        ...UserDetail
      }
    }
  }
  ${GQL_FRAGMENT_USER_DETAIL}
`

export type UserDetailResponse = {
  user: UserDetail
}
export type UserDetailInputProps = RouteComponentProps
export type UserDetailVariables = {
  input: {
    id: string
  }
}
export type UserDetailChildProps = ChildDataProps<
  UserDetailInputProps,
  UserDetailResponse,
  UserDetailVariables
>

const userDetail = graphql<
  UserDetailInputProps,
  UserDetailResponse,
  UserDetailVariables,
  UserDetailChildProps
>(GET_USER_DETAIL, {
  options: props => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: {
          id
        }
      }
    }
  }
})

export default userDetail
