export const PATH = {
  HOMEPAGE: '/',
  HOMEPAGE_MATTERS_TODAY: '/homepage/matters-today',
  HOMEPAGE_HOT: '/homepage/hot',
  HOMEPAGE_NEWEST: '/homepage/newest',
  HOMEPAGE_HOT_DISCUSSIONS: '/homepage/hot-discussions',
  HOMEPAGE_MATTERS_CHOICE: '/homepage/matters-choice',
  HOMEPAGE_AUTHORS: '/homepage/authors',
  HOMEPAGE_TAGS: '/homepage/tags',

  TAG_LIST: '/tags',
  TAG_DETAIL: '/tags/:id',

  USER_LIST: '/users',
  USER_DETAIL: '/users/:id',

  ARTICLE_LIST: '/articles',
  ARTICLE_DETAIL: '/articles/:id',

  COMMENT_LIST: '/comments',
  COMMENT_DETAIL: '/comments/:id',

  REPORT_LIST_ARTICLE: '/reports/article',
  REPORT_LIST_COMMENT: '/reports/comment',
  REPORT_DETAIL: '/reports/:id',

  FEEDBACK: '/feedback',

  LOGIN: '/auth/login/'
}

export const PAGE_TITLE = {
  [PATH.HOMEPAGE]: '首頁',
  [PATH.HOMEPAGE_MATTERS_TODAY]: 'Matters Today',
  [PATH.HOMEPAGE_HOT]: '熱門文章',
  [PATH.HOMEPAGE_NEWEST]: '最新發布',
  [PATH.HOMEPAGE_HOT_DISCUSSIONS]: '熱議話題',
  [PATH.HOMEPAGE_MATTERS_CHOICE]: '不要錯過 (Matters Choice)',
  [PATH.HOMEPAGE_AUTHORS]: '活躍作者',
  [PATH.HOMEPAGE_TAGS]: '標籤',

  [PATH.TAG_LIST]: '標籤清單',
  [PATH.TAG_DETAIL]: '標籤詳情',

  [PATH.USER_LIST]: '用戶清單',
  [PATH.USER_DETAIL]: '用戶詳情',

  [PATH.ARTICLE_LIST]: '文章清單',
  [PATH.ARTICLE_DETAIL]: '文章詳情',

  [PATH.COMMENT_LIST]: '評論清單',
  [PATH.COMMENT_DETAIL]: '評論詳情',

  [PATH.REPORT_LIST_ARTICLE]: '舉報文章清單',
  [PATH.REPORT_LIST_COMMENT]: '舉報評論清單',
  [PATH.REPORT_DETAIL]: '舉報詳情',

  [PATH.FEEDBACK]: '反饋',

  [PATH.LOGIN]: '登入'
}
