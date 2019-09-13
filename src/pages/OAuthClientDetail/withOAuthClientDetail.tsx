import { graphql } from 'react-apollo'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { OAuthClientDetail } from '../../definitions'
import QueryOAuthClientDetail from '../../gql/queries/oauthClientDetail.gql'

type OAuthClientDetailResponse = {
  oauthClient: OAuthClientDetail
}
type OAuthClientDetailInputProps = RouteComponentProps
type OAuthClientDetailVariables = {
  input: {
    id: string
  }
}
export type OAuthClientDetailChildProps = ChildDataProps<
  OAuthClientDetailInputProps,
  OAuthClientDetailResponse,
  OAuthClientDetailVariables
>

const withOAuthClientDetail = graphql<
  OAuthClientDetailInputProps,
  OAuthClientDetailResponse,
  OAuthClientDetailVariables,
  OAuthClientDetailChildProps
>(QueryOAuthClientDetail, {
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

export default withOAuthClientDetail
