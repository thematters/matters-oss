import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const MarkSpam = gql`
  mutation SetSpamStatus($input: SetSpamStatusInput!) {
    setSpamStatus(input: $input) {
      id
      oss {
        spamStatus {
          isSpam
        }
      }
    }
  }
`

type Response = {
  setSpamStatus: {
    id: string
    oss: {
      spamStatus: {
        isSpam?: boolean
      }
    }
  }
}

type InputProps = {
  articleId: string
  isSpam: boolean | null
}

type Variables = {
  input: {
    id: string
    isSpam: boolean
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withMarkSpam = graphql<InputProps, Response, Variables, ChildProps>(
  MarkSpam
)

export default withMarkSpam
