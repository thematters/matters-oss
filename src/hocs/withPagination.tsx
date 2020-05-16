import * as React from 'react'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import { pageToCursor } from '../utils'
import { PAGE_SIZE } from '../constants'

type WithPaginationProps = {
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore: any
    variables: any
  }
}

const withPagination = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> => {
  class WithPagination extends React.Component<P & WithPaginationProps> {
    private _fetchMore = (page: number, pageSize?: number) => {
      const { pagination } = this.props

      if (!pagination) return

      const cursor = pageToCursor(page, pageSize || 0)

      pagination.fetchMore({
        variables: {
          input: {
            ...pagination.variables.input,
            after: cursor,
          },
        },
        updateQuery: (_: any, { fetchMoreResult }: any) => fetchMoreResult,
      })
    }

    public render() {
      const { pagination, ...props } = this.props

      return (
        // @ts-ignore
        <WrappedComponent
          {...props}
          pagination={
            pagination
              ? {
                  total: pagination.totalCount,
                  pageSize: pagination.pageSize || PAGE_SIZE,
                  onChange: this._fetchMore,
                }
              : false
          }
        />
      )
    }
  }

  return WithPagination
}

export default withPagination
