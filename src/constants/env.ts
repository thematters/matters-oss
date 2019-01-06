export const __DEV__ =
  !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'dev'
export const __TEST__ = process.env.REACT_APP_ENV === 'test'
export const __STAGE__ = process.env.REACT_APP_ENV === 'stage'
export const __PROD__ = process.env.REACT_APP_ENV === 'production'

export const API_ENDPOINT = __DEV__
  ? 'http://localhost:4000'
  : __TEST__
  ? 'http://localhost:4000'
  : __STAGE__
  ? 'https://server-stage.matters.news'
  : ''
