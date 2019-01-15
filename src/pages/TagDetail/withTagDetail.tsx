import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { TagDetail } from '../../definitions'
import { GQL_FRAGMENT_TAG_DETAIL } from '../../gql'

const GET_TAG_DETAIL = gql`
  query TagDetail($input: NodeInput!) {
    tag: node(input: $input) {
      ... on Tag {
        ...TagDetail
      }
    }
  }
  ${GQL_FRAGMENT_TAG_DETAIL}
`

export type TagDetailResponse = {
  tag: TagDetail
}
export type TagDetailInputProps = RouteComponentProps
export type TagDetailVariables = {
  input: {
    id: string
  }
}
export type TagDetailChildProps = ChildDataProps<
  TagDetailInputProps,
  TagDetailResponse,
  TagDetailVariables
>

const tagDetail = graphql<
  TagDetailInputProps,
  TagDetailResponse,
  TagDetailVariables,
  TagDetailChildProps
>(GET_TAG_DETAIL, {
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

export default tagDetail
