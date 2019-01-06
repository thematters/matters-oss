import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

class MattersToday extends React.PureComponent {
  public render() {
    return (
      <Query
        query={gql`
          {
            node(input: { id: "VXNlcjox" }) {
              ... on User {
                id
                info {
                  displayName
                  userName
                }
                notices(input: { limit: 50 }) {
                  id
                  __typename
                  createdAt
                  unread
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return data.node.info.displayName
        }}
      </Query>
    )
  }
}

export default MattersToday
