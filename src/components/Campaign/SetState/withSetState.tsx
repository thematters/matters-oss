import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_STATE = gql`
  mutation updateCampaignState($id: ID!, $state: CampaignState!) {
    putWritingChallenge(input: { id: $id, state: $state }) {
      id
      state
    }
  }
`

type Response = {
  updateCampaignState: {
    id: string
    state: string
  }
}

export type CampaignState = 'active' | 'pending' | 'finished' | 'archived'

type InputProps = {
  id: string
  campaignState?: CampaignState
  disabled?: boolean
  onSuccess?: () => void
}

type Variables = {
  id: string
  state: CampaignState
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetState = graphql<InputProps, Response, Variables, ChildProps>(
  SET_STATE
)

export default withSetState
