import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const RESET_WALLET = gql`
  mutation ResetWallet($input: ResetWalletInput!) {
    resetWallet(input: $input) {
      id
      __typename
    }
  }
`

type Response = {
  resetWallet: {
    user: {
      id: string
    }
  }
}

type InputProps = {
  id: string
  ethAddress: string | undefined
}

type Variables = {
  input: {
    id: string
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withResetWallet = graphql<InputProps, Response, Variables, ChildProps>(
  RESET_WALLET
)

export default withResetWallet
