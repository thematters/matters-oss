import gql from 'graphql-tag'

/**
 * User
 */
export const GQL_FRAGMENT_USER_DIGEST = gql`
  fragment UserDigest on User {
    id
    uuid
    info {
      userName
      displayName
    }
  }
`

/**
 * Tag
 */
export const GQL_FRAGMENT_TAG_DIGEST = gql`
  fragment TagDigest on Tag {
    id
    content
  }
`

/**
 * Article
 */
export const GQL_FRAGMENT_ARTICLE_DIGEST = gql`
  fragment ArticleDigest on Article {
    id
    slug
    title
    createdAt
    publishState
    public
    live
    author {
      ...UserDigest
    }
    tags {
      ...TagDigest
    }
  }
  ${GQL_FRAGMENT_TAG_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`
export const GQL_FRAGMENT_ARTICLE_DETAIL = gql`
  fragment ArticleDetail on Article {
    ...ArticleDigest
    cover
    summary
    wordCount
    dataHash
    mediaHash
    content
    gatewayUrls
    upstream {
      ...ArticleDigest
    }
    downstreams(input: { limit: 50 }) {
      ...ArticleDigest
    }
    relatedArticles(input: { limit: 50 }) {
      ...ArticleDigest
    }
    MAT
    participantCount
    subscribers(input: { limit: 50 }) {
      ...UserDigest
    }
    # appreciators(input: { limit: 50 }) {
    #   ...UserDigest
    # }
    # appreciatorCount
    subscribed
    hasAppreciate
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`
