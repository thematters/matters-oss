import { graphql } from 'react-apollo'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { UserDetail } from '../../definitions'
import QueryUserDetail from '../../gql/queries/userDetail.gql'

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
>(QueryUserDetail, {
  options: (props) => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: {
          id,
        },
        author: id,
      },
    }
  },
})

export default userDetail
