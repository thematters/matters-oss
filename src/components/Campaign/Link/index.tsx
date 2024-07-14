import * as React from 'react'
import { Link } from 'react-router-dom'

import { PATH } from '../../../constants'

type CampaignLinkProps = {
  id: string
  name: string
}

const CampaignLink: React.FunctionComponent<CampaignLinkProps> = ({
  id,
  name,
}) => {
  return <Link to={PATH.CAMPAIGN_DETAIL.replace(':id', id)}>{name}</Link>
}

export default CampaignLink
