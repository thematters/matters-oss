/**
 * User
 */
export type UserDigest = {
  id: string
  uuid: string
  info: {
    userName: string
    displayName: string
  }
}

/**
 * Tag
 */
export type TagDigest = {
  id: string
  content: string
}

/**
 * Article
 */
export type ArticleDigest = {
  id: string
  slug: string
  createdAt: Date
  publishState: string
  live: boolean
  public: boolean
  author: UserDigest
  title: string
  tags: TagDigest[]
}

export type ArticleDetail = ArticleDigest & {
  cover: string
  summary: string
  wordCount: number
  dataHash: string
  mediaHash: string
  content: string
  gatewayUrls: string[]
  upstream: ArticleDigest
  downstreams: Connection<ArticleDigest>
  relatedArticles: Connection<ArticleDigest>
  MAT: number
  participantCount: number
  subscribers: UserDigest[]
  subscribed: boolean
  hasAppreciate: boolean
}

/**
 * Pagination
 */
export type ConnectionArgs = {
  before?: string
  after?: string
  first?: number
  last?: number
}

export type PageInfo = {
  startCursor: string
  endCursor: string
  hasNextPage: boolean
}

export type Connection<Node> = {
  pageInfo: PageInfo
  edges: Edge<Node>[]
}

export type Edge<Node> = {
  cursor: string
  node: Node
}
