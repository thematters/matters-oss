import { graphql } from 'react-apollo'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { TagDetail } from '../../definitions'
import QueryTagDetail from '../../gql/queries/tagDetail.gql'

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
>(QueryTagDetail, {
  options: (props) => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: {
          id,
        },
      },
    }
  },
})

export default tagDetail
