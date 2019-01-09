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
  downstreams: ArticleDigest[]
  relatedArticles: ArticleDigest[]
  MAT: number
  participantCount: number
  subscribers: UserDigest[]
  subscribed: boolean
  hasAppreciate: boolean
}
