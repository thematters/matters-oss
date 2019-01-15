import gql from 'graphql-tag'

// User Digest
export const GQL_FRAGMENT_USER_DIGEST = gql`
  fragment UserDigest on User {
    id
    uuid
    info {
      userName
      displayName
      description
      email
    }
    status {
      state
      articleCount
      commentCount
      MAT {
        total
      }
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
    count
    createdAt
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
    state
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
    upstream {
      ...ArticleDigest
    }
    downstreams(input: { first: 10 }) {
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    relatedArticles(input: { first: 10 }) {
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    MAT
    participantCount
    subscribers(input: { first: 10 }) {
      edges {
        node {
          ...UserDigest
        }
      }
    }
    # appreciators(input: { first: 10 }) {
    #   edges {
    #     node {
    #       ...UserDigest
    #     }
    #   }
    # }
    # appreciatorCount
    subscribed
    hasAppreciate
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`

// User Detail
export const GQL_FRAGMENT_USER_DETAIL = gql`
  fragment UserDetail on User {
    ...UserDigest
    info {
      createdAt
      userName
      userNameEditable
      displayName
      description
      avatar
      email
      emailVerified
      mobile
    }
    settings {
      language
    }
    articles(input: { first: 10 }) {
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    commentedArticles(input: { first: 10 }) {
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    subscriptions(input: { first: 10 }) {
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    status {
      state
      MAT {
        total
      }
      invitation {
        left
        sent(input: { first: 100 }) {
          edges {
            node {
              id
              user {
                ...UserDigest
              }
              email
              accepted
              createdAt
            }
          }
        }
      }
      articleCount
      # viewCount
      # draftCount
      commentCount
      # quotationCount
      subscriptionCount
      followeeCount
      followerCount
    }
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`

// Tag Detail
export const GQL_FRAGMENT_TAG_DETAIL = gql`
  fragment TagDetail on Tag {
    id
    content
    count
    createdAt
    articles(input: { first: 10 }) {
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
`
