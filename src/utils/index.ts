export * from './url'
export * from './time'
export * from './pagination'

export const stripHtml = (html: string, replacement = ' ') =>
  (String(html) || '')
    .replace(/(<\/p><p>|&nbsp;)/g, ' ') // replace line break and space first
    .replace(/(<([^>]+)>)/gi, replacement)
