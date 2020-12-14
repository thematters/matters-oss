import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_TAG_SELECTED = gql`
  mutation ToggleTagSelected($input: ToggleRecommendInput!) {
    toggleTagRecommend(input: $input) {
      id
      oss {
        selected
      }
    }
  }
`

type Response = {
  toggleTagSelected: {
    oss: {
      selected: boolean
    }
  }
}

type InputProps = {
  checked: boolean
  tagId: string
}

type Variables = {
  input: {
    id: string
    enabled: boolean
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withToggleSelected = graphql<InputProps, Response, Variables, ChildProps>(
  TOGGLE_TAG_SELECTED
)

export default withToggleSelected
