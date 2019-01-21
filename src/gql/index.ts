import gql from 'graphql-tag'

import { PAGE_SIZE } from '../constants'

export const GQL_FRAGMENT_CONNECTION_INFO = gql`
  fragment ConnectionInfo on Connection {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
`

/*********************************
 *                               *
 *            Digest             *
 *                               *
 *********************************/
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
    oss {
      boost
      score
    }
  }
`

// Tag Digest
export const GQL_FRAGMENT_TAG_DIGEST = gql`
  fragment TagDigest on Tag {
    id
    content
    count
    createdAt
    oss {
      boost
      score
    }
  }
`

// Article Digest
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
    oss {
      boost
      score
      inRecommendToday
      inRecommendIcymi
      inRecommendHottest
      inRecommendNewest
    }
  }
  ${GQL_FRAGMENT_TAG_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`

// Comment Digest
export const GQL_FRAGMENT_COMMENT_DIGEST = gql`
  fragment CommentDigest on Comment {
    id
    state
    createdAt
    article {
      ...ArticleDigest
    }
    content
    author {
      ...UserDigest
    }
    pinned
    upvotes
    downvotes
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`

/*********************************
 *                               *
 *            Detail             *
 *                               *
 *********************************/
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
    articles(input: { first: ${PAGE_SIZE} }) {
      ...ConnectionInfo
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    commentedArticles(input: { first: ${PAGE_SIZE} }) {
      ...ConnectionInfo
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    subscriptions(input: { first: ${PAGE_SIZE} }) {
      ...ConnectionInfo
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
        sent(input: { first: ${PAGE_SIZE}0 }) {
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
    remark
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`

// Tag Detail
export const GQL_FRAGMENT_TAG_DETAIL = gql`
  fragment TagDetail on Tag {
    ...TagDigest
    articles(input: { first: ${PAGE_SIZE} }) {
      ...ConnectionInfo
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    remark
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_TAG_DIGEST}
`

// Article Detail
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
    downstreams(input: { first: ${PAGE_SIZE} }) {
      ...ConnectionInfo
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    relatedArticles(input: { first: ${PAGE_SIZE} }) {
      ...ConnectionInfo
      edges {
        node {
          ...ArticleDigest
        }
      }
    }
    MAT
    participantCount
    subscribers(input: { first: ${PAGE_SIZE} }) {
      ...ConnectionInfo
      edges {
        node {
          ...UserDigest
        }
      }
    }
    # appreciators(input: { first: ${PAGE_SIZE} }) {
    #   edges {
    #     node {
    #       ...UserDigest
    #     }
    #   }
    # }
    # appreciatorCount
    subscribed
    hasAppreciate
    remark
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`

/*********************************
 *                               *
 *             Misc              *
 *                               *
 *********************************/
// Report
export const GQL_FRAGMENT_REPORT = gql`
  fragment Report on Report {
    id
    user {
      ...UserDigest
    }
    article {
      ...ArticleDigest
    }
    comment {
      ...CommentDigest
    }
    assets
    category
    description
    contact
    createdAt
    remark
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
  ${GQL_FRAGMENT_COMMENT_DIGEST}
  ${GQL_FRAGMENT_USER_DIGEST}
`
