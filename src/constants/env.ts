export const __DEV__ =
  !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'dev'
export const __TEST__ = process.env.REACT_APP_ENV === 'test'
export const __DEVELOP__ = process.env.REACT_APP_ENV === 'develop'
export const __PROD__ = process.env.REACT_APP_ENV === 'production'

export const API_ENDPOINT = __DEV__
  ? 'http://localhost:4000'
  : __TEST__
  ? 'http://localhost:4000'
  : __DEVELOP__
  ? 'https://server-develop.matters.news'
  : __PROD__
  ? 'https://server.matters.news'
  : ''
