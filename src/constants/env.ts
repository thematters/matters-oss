export const __DEV__ =
  !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'dev'
export const __TEST__ = process.env.REACT_APP_ENV === 'test'
export const __DEVELOP__ = process.env.REACT_APP_ENV === 'develop'
export const __PROD__ = process.env.REACT_APP_ENV === 'production'

export const API_ENDPOINT = __DEV__
  ? 'https://server-stage.matters.news/graphql'
  : __TEST__
  ? 'http://localhost:4000/graphql'
  : __DEVELOP__
  ? 'https://server-stage.matters.news/graphql'
  : __PROD__
  ? 'https://server.matters.news/graphql'
  : ''

export const SITE_DOMIAN = __PROD__
  ? 'https://matters.news'
  : 'https://web-develop.matters.news'
