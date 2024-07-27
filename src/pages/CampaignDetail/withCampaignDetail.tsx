import { graphql } from 'react-apollo'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { CampaignDetail } from '../../definitions'
import QueryCampaignDetail from '../../gql/queries/campaignDetail.gql'

type CampaignDetailResponse = {
  campaign: CampaignDetail
}
type CampaignDetailInputProps = RouteComponentProps
type CampaignDetailVariables = {
  shortHash: string
}
export type CampaignDetailChildProps = ChildDataProps<
  CampaignDetailInputProps,
  CampaignDetailResponse,
  CampaignDetailVariables
>

const withCampaignDetail = graphql<
  CampaignDetailInputProps,
  CampaignDetailResponse,
  CampaignDetailVariables,
  CampaignDetailChildProps
>(QueryCampaignDetail, {
  options: (props) => {
    const shortHash = _get(props, 'match.params.id')
    return {
      variables: {
        shortHash,
      },
    }
  },
})

export default withCampaignDetail
