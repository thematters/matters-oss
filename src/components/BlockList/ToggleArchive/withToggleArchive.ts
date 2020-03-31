import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_BLOCK_LIST_ITEM_ARCHIVE = gql`
  mutation PutSkippedListItem($input: PutSkippedListItemInput!) {
    putSkippedListItem(input: $input) {
      id
      archived
      updatedAt
    }
  }
`

type Response = {
  toggleBlockListItemArchive: {
    archived: boolean
  }
}

type InputProps = {
  checked: boolean
  id: string
}

type Variables = {
  input: {
    archived: boolean
    id: string
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withToggleArchive = graphql<InputProps, Response, Variables, ChildProps>(
  TOGGLE_BLOCK_LIST_ITEM_ARCHIVE
)

export default withToggleArchive
