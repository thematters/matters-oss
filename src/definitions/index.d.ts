import {
  GQLArticleState,
  GQLUserState,
  GQLCommentState,
  GQLPageInfo,
  GQLUUID,
  GQLUserInfo,
  GQLUserSettings,
  GQLUserStatus,
  GQLLiker,
} from './schema'

export * from './schema'

/**
 * User
 */
export type USER_BADGE_TYPES = 'seed' | 'golden_motor' | 'architect'

export type UserDigest = {
  id: string
  uuid: GQLUUID
  userName: string
  displayName: string
  info: {
    createdAt: Date
    description: string
    badges: {
      type: USER_BADGE_TYPES
    }[]
  }
  status: {
    state: GQLUserState
    articleCount: number
    commentCount: number
  }
  oss: {
    boost: number
  }
}

export type UserDetail = UserDigest & {
  info: GQLUserInfo
  liker: GQLLiker
  settings: GQLUserSettings
  articles: Connection<ArticleDigest>
  followers: Connection<UserDigest>
  following: {
    users: Connection<UserDigest>
  }
  commentedArticles: Connection<
    ArticleDigest & { comments: Connection<CommentDigest> }
  >
  subscriptions: Connection<ArticleDigest>
  status: GQLUserStatus
  remark: string
}

/**
 * Tag
 */
export type TagDigest = {
  id: string
  content: string
  createdAt: Date
  description: number
  oss: {
    boost: number
    score: number
    selected: boolean
  }
  deleted: boolean
}

export type TagDetail = TagDigest & {
  articles: Connection<ArticleDigest>
  remark: string
  creator: {
    id: string
    userName: string
    displayName: string
  }
  editors: Array<{
    id: string
    userName: string
    displayName: string
  }>
}

/**
 * Article
 */
export type ArticleDigest = {
  id: string
  slug: string
  mediaHash: string
  createdAt: Date
  state: GQLArticleState
  live: boolean
  author: UserDigest
  title: string
  tags: TagDigest[]
  oss: {
    boost: number
    score: number
    inRecommendIcymi: boolean
    inRecommendHottest: boolean
    inRecommendNewest: boolean
  }
}

export type ArticleDetail = ArticleDigest & {
  cover: string
  summary: string
  wordCount: number
  dataHash: string
  mediaHash: string
  content: string
  appreciationsReceivedTotal: number
  collection: Connection<ArticleDigest>
  collectedBy: Connection<ArticleDigest>
  subscribers: UserDigest[]
  subscribed: boolean
  hasAppreciate: boolean
  remark: string
  comments: Connection<CommentDigest>
}

/**
 * Comment
 */
export type CommentDigest = {
  id: string
  state: GQLCommentState
  createdAt: Date
  node: ArticleDigest
  content: string
  author: UserDigest
  pinned: boolean
  upvotes: number
  downvotes: number
}

export type CommentDetail = CommentDigest

/**
 * Pagination
 */
export type Connection<Node> = {
  totalCount: number
  pageInfo: GQLPageInfo
  edges: Edge<Node>[]
}

export type Edge<Node> = {
  cursor: string
  node: Node
}

/**
 * OAuth Client
 */
export type OAuthClientDigest = {
  id: string
  name: string
  website: string
  scope: string[]
  avatar: string
  createdAt: Date
}

export type OAuthClientDetail = OAuthClientDigest & {
  secret: string
  description: string
  redirectURIs: string[]
  grantTypes: string[]
  user: UserDigest
}

/**
 * Block List Item Digest
 */
export interface BlockListItemDigest {
  id: string
  uuid: GQLUUID
  type: string
  value: string
  createdAt: Date
  updatedAt: Date
}

export type FeatureName =
  | 'verify_appreciate'
  | 'payout'
  | 'add_credit'
  | 'payment'
  | 'tag_adoption'

export interface FeatureFlagItem {
  name: FeatureName
  enabled: boolean
}

/**
 * Announcement
 */
export type AnnouncementType = 'community' | 'product' | 'seminar'

export interface Announcement {
  id: string
  title: string
  cover: string
  content: string
  link?: string
  type: AnnouncementType
  visible: boolean
  order: int
}
