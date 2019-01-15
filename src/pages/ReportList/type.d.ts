import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { Report, GQLConnectionArgs, Connection } from '../../definitions'

export type ReportsResponse = {
  oss: {
    reports: Connection<Report>
  }
}
export type ReportsInputProps = RouteComponentProps & {
  type: 'article' | 'comment'
}
export type ReportsVariables = {
  input: GQLConnectionArgs
}
export type ReportsChildProps = ChildDataProps<
  ReportsInputProps,
  ReportsResponse,
  ReportsVariables
>
