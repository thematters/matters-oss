export const __LOCAL__ =
  !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'local'
export const __DEVELOP__ = process.env.REACT_APP_ENV === 'develop'
export const __STAGE__ = process.env.REACT_APP_ENV === 'stage'
export const __PROD__ = process.env.REACT_APP_ENV === 'production'

export const API_ENDPOINT = __LOCAL__
  ? 'https://server-stage.matters.news/graphql'
  : __STAGE__
  ? 'https://server-stage.matters.news/graphql'
  : __DEVELOP__
  ? 'https://server-develop.matters.news/graphql'
  : __PROD__
  ? 'https://server.matters.news/graphql'
  : ''

export const SITE_DOMIAN = __PROD__
  ? 'https://matters.news'
  : __STAGE__
  ? 'https://web-stage.matters.news'
  : 'https://web-develop.matters.news'

export const SENTRY_DSN = __LOCAL__
  ? 'http://9ea964b072084db9b96da11ef5fdf7bf@0.0.0.0:9000/2'
  : __DEVELOP__
  ? 'https://ffff3af1e8d040fdb7d0e627683b43fa@sentry.matters.one/3'
  : __PROD__
  ? 'https://d4ab98217ed3492e992473f5b9b217a7@sentry.matters.one/4'
  : ''
