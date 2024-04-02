import _get from 'lodash/get'
import { ChildDataProps, graphql } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { GQLIcymiTopic } from '../../definitions'
import QueryIcymiTopicDetail from '../../gql/queries/icymiTopicDetail.gql'

export type IcymiTopicDetailResponse = {
  node: GQLIcymiTopic
}

export type IcymiTopicDetailVariables = {
  input: {
    id: string
  }
}

export type IcymiTopicDetailChildProps = ChildDataProps<
  RouteComponentProps,
  IcymiTopicDetailResponse,
  IcymiTopicDetailVariables
>

export default graphql<
  RouteComponentProps,
  IcymiTopicDetailResponse,
  IcymiTopicDetailVariables,
  IcymiTopicDetailChildProps
>(QueryIcymiTopicDetail, {
  options: (props) => {
    const id = _get(props, 'match.params.id')
    console.log(id)
    return {
      variables: {
        input: { id },
      },
    }
  },
})
