import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const PUT_REMARK = gql`
  mutation putRemark($input: PutRemarkInput!) {
    putRemark(input: $input)
  }
`

type Response = {
  putRemark: string
}

type RemarkTypes =
  | 'Article'
  | 'Tag'
  | 'User'
  | 'Comment'
  | 'Report'
  | 'Feedback'

type InputProps = {
  id: string
  remark: string
  type: RemarkTypes
}

type Variables = {
  input: {
    id: string
    remark: string
    type: RemarkTypes
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withPutRemark = graphql<InputProps, Response, Variables, ChildProps>(
  PUT_REMARK
)

export default withPutRemark
