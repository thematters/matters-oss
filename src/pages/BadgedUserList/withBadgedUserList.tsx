import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../../definitions'
import { getCurrentPaginationFromUrl } from '../../utils'
import QueryBadgedUserList from '../../gql/queries/badgedUserList.gql'

type BadgedUsersResponse = {
  oss: {
    badgedUsers: Connection<UserDigest>
  }
}

type BadgedUsersInputProps = RouteComponentProps

type BadgedUsersVariables = { input: GQLConnectionArgs }

export type BadgedUsersChildProps = ChildDataProps<
  BadgedUsersInputProps,
  BadgedUsersResponse,
  BadgedUsersVariables
>

const BadgedUsers = graphql<
  BadgedUsersInputProps,
  BadgedUsersResponse,
  BadgedUsersVariables,
  BadgedUsersChildProps
>(QueryBadgedUserList, {
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
        },
      },
    }
  },
})

export default BadgedUsers
