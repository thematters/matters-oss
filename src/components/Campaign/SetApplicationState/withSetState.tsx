import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { GQLCampaignApplicationState } from '../../../definitions'

const SET_STATE = gql`
  mutation updateCampaignApplicationState(
    $user: ID!
    $campaign: ID!
    $state: CampaignApplicationState!
  ) {
    updateCampaignApplicationState(
      input: { user: $user, campaign: $campaign, state: $state }
    ) {
      id
    }
  }
`

type Response = {
  updateCampaignApplicationState: {
    user: string
    campaign: string
    state: string
  }
}

type InputProps = {
  user: string
  campaign: string
  applicationState?: GQLCampaignApplicationState
  disabled?: boolean
  onSuccess?: () => void
}

type Variables = {
  user: string
  campaign: string
  state: GQLCampaignApplicationState
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetState = graphql<InputProps, Response, Variables, ChildProps>(
  SET_STATE
)

export default withSetState
