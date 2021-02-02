import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../../definitions'
import { getCurrentPaginationFromUrl } from '../../utils'
import QuerySeedingUserList from '../../gql/queries/seedingUserList.gql'

type SeedingUsersResponse = {
  oss: {
    seedingUsers: Connection<UserDigest>
  }
}

type SeedingUsersInputProps = RouteComponentProps

type SeedingUsersVariables = { input: GQLConnectionArgs }

export type SeedingUsersChildProps = ChildDataProps<
  SeedingUsersInputProps,
  SeedingUsersResponse,
  SeedingUsersVariables
>

const seedingUsers = graphql<
  SeedingUsersInputProps,
  SeedingUsersResponse,
  SeedingUsersVariables,
  SeedingUsersChildProps
>(QuerySeedingUserList, {
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

export default seedingUsers
