export * from './env'
export * from './route'
export * from './store'
export * from './error'

export const PAGE_SIZE = 20

export const UPLOAD_FILE_SIZE_LIMIT: number = 5 * 1024 * 1024

export const ANNOUNCEMENT_TYPES: { key: string; text: string }[] = [
  { key: 'community', text: '社區' },
  { key: 'product', text: '產品' },
  { key: 'seminar', text: '講座' },
]
