export const __DEV__ =
  !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'development'
export const __TEST__ = process.env.REACT_APP_ENV === 'test'
export const __STAGE__ = process.env.REACT_APP_ENV === 'stage'
export const __PROD__ = process.env.REACT_APP_ENV === 'production'

export const API_ENDPOINT = {
  development: 'http://localhost:4000',
  test: 'http://localhost:4000',
  stage: 'https://server-stage.matters.news',
  production: '' // TODO
}[process.env.REACT_APP_ENV || 'development']
