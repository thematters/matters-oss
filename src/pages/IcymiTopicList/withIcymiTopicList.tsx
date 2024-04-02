import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { getCurrentPaginationFromUrl } from '../../utils'
import { PAGE_SIZE } from '../../constants'
import {
  IcymiTopicDigest,
  GQLConnectionArgs,
  Connection,
} from '../../definitions'
import IcymiTopicList from '../../gql/queries/icymiTopicList.gql'

type IcymiTopicsResponse = {
  oss: {
    icymiTopics: Connection<IcymiTopicDigest>
  }
}
type IcymiTopicsInputProps = RouteComponentProps
type IcymiTopicsVariables = {
  input: GQLConnectionArgs
}
type IcymiTopicsChildProps = ChildDataProps<
  IcymiTopicsInputProps,
  IcymiTopicsResponse,
  IcymiTopicsVariables
>

export type IcymiTopicListChildProps = IcymiTopicsChildProps

export default graphql<
  IcymiTopicsInputProps,
  IcymiTopicsResponse,
  IcymiTopicsVariables,
  IcymiTopicsChildProps
>(IcymiTopicList, {
  options: (_) => {
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
