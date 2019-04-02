import {
  GQLArticleState,
  GQLUserState,
  GQLCommentState,
  GQLPageInfo,
  GQLEmail,
  GQLUUID,
  GQLUserInfo,
  GQLUserSettings,
  GQLUserStatus
} from './schema'

export * from './schema'

/**
 * User
 */
export type UserDigest = {
  id: string
  uuid: GQLUUID
  info: {
    userName: string
    displayName: string
    email: GQLEmail
    description: string
  }
  status: {
    state: GQLUserState
    articleCount: number
    commentCount: number
    MAT: {
      total: number
    }
  }
  oss: {
    boost: number
    score: number
  }
}

export type UserDetail = UserDigest & {
  info: GQLUserInfo
  settings: GQLUserSettings
  articles: Connection<ArticleDigest>
  commentedArticles: Connection<ArticleDigest>
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
  count: number
  createdAt: Date
  oss: {
    boost: number
    score: number
  }
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
  upstream: ArticleDigest
  downstreams: Connection<ArticleDigest>
  relatedArticles: Connection<ArticleDigest>
  MAT: number
  participantCount: number
  subscribers: UserDigest[]
  subscribed: boolean
  hasAppreciate: boolean
  remark: string
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
  quote: boolean
}

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
