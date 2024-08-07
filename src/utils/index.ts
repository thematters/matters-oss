export * from './url'
export * from './pagination'
export * from './random'
export * from './error'
export * from './globalId'

export const stripHtml = (html: string, replacement = ' ') =>
  (String(html) || '')
    .replace(/(<\/p><p>|&nbsp;)/g, ' ') // replace line break and space first
    .replace(/(<([^>]+)>)/gi, replacement)
