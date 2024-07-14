import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import {
  CampaignDigest,
  GQLConnectionArgs,
  Connection,
} from '../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import QueryCampaignList from '../../gql/queries/campaignList.gql'

type AllCampaignsResponse = {
  oss: {
    campaigns: Connection<CampaignDigest>
  }
}
type AllCampaignsInputProps = RouteComponentProps
type AllCampaignsVariables = {
  input: GQLConnectionArgs
}
type AllCampaignsChildProps = ChildDataProps<
  AllCampaignsInputProps,
  AllCampaignsResponse,
  AllCampaignsVariables
>

export type CampaignListChildProps = AllCampaignsChildProps

const allCampaigns = graphql<
  AllCampaignsInputProps,
  AllCampaignsResponse,
  AllCampaignsVariables,
  AllCampaignsChildProps
>(QueryCampaignList, {
  // name: 'allCampaign',
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
        },
      },
    }
  },
  skip: () => !!getSearchKey(),
})

export default compose(allCampaigns)
