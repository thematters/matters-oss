import {
  GQLArticleState,
  GQLUserState,
  GQLCommentState,
  GQLPageInfo,
  GQLEmail,
  GQLUUID,
  GQLUserInfo,
  GQLUserSettings,
  GQLUserStatus,
  GQLLiker
} from './schema'

export * from './schema'

/**
 * User
 */
export type UserDigest = {
  id: string
  uuid: GQLUUID
  userName: string
  displayName: string
  info: {
    createdAt: Date
    email: GQLEmail
    description: string
  }
  status: {
    state: GQLUserState
    articleCount: number
    commentCount: number
  }
  oss: {
    boost: number
    score: number
  }
}

export type UserDetail = UserDigest & {
  info: GQLUserInfo
  liker: GQLLiker
  settings: GQLUserSettings
  articles: Connection<ArticleDigest>
  followers: Connection<UserDigest>
  followees: Connection<UserDigest>
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
  }
  deleted: boolean
}

export type TagDetail = TagDigest & {
  articles: Connection<ArticleDigest>
  remark: string
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
  public: boolean
  author: UserDigest
  title: string
  tags: TagDigest[]
  oss: {
    boost: number
    score: number
    inRecommendToday: boolean
    inRecommendIcymi: boolean
    inRecommendHottest: boolean
    inRecommendNewest: boolean
    todayCover: string
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
  article: ArticleDigest
  content: string
  author: UserDigest
  pinned: boolean
  upvotes: number
  downvotes: number
}

export type CommentDetail = CommentDigest

/**
 * Report
 */
export type Report = {
  id: string
  user: UserDigest
  article: ArticleDigest
  comment: CommentDigest
  assets: string[]
  category: string
  description: string
  contact: string
  createdAt: Date
  remark: string
}

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
