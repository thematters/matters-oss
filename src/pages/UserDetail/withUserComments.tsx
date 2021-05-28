import { graphql } from 'react-apollo'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { UserDetail } from '../../definitions'
import QueryUserComments from '../../gql/queries/userComments.gql'

export type UserCommentsResponse = {
  user: Pick<UserDetail, 'id' | 'commentedArticles'>
}
export type UserCommentsInputProps = { id: string }
export type UserCommentsVariables = {
  input: {
    id: string
  }
}
export type UserCommentsChildProps = ChildDataProps<
  UserCommentsInputProps,
  UserCommentsResponse,
  UserCommentsVariables
>

const userComments = graphql<
  UserCommentsInputProps,
  UserCommentsResponse,
  UserCommentsVariables,
  UserCommentsChildProps
>(QueryUserComments, {
  options: (props) => {
    const { id } = props
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

export default userComments
