import * as React from 'react'
import { Link } from 'react-router-dom'

import { PATH } from '../../../constants'

type CampaignLinkProps = {
  shortHash: string
  name: string
}

const CampaignLink: React.FunctionComponent<CampaignLinkProps> = ({
  shortHash,
  name,
}) => {
  return <Link to={PATH.CAMPAIGN_DETAIL.replace(':id', shortHash)}>{name}</Link>
}

export default CampaignLink
