import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_SENSITIVE = gql`
  mutation UpdateArticleSensitive($input: UpdateArticleSensitiveInput!) {
    updateArticleSensitive(input: $input) {
      id
      sensitiveByAdmin
    }
  }
`

type InputProps = {
  checked: boolean
  articleId: string
}

type Response = {
  updateArticleSensitive: {
    sensitiveByAdmin: boolean
  }
}

type Variables = {
  input: {
    id: string
    sensitive: boolean
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withToggleSensitive = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_SENSITIVE)

export default withToggleSensitive
