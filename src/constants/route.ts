export const PATH = {
  HOMEPAGE: '/',
  HOMEPAGE_HOTTEST: '/homepage/hottest',
  HOMEPAGE_NEWEST: '/homepage/newest',
  HOMEPAGE_ICYMI: '/homepage/icymi',
  HOMEPAGE_AUTHORS: '/homepage/authors',
  HOMEPAGE_TAGS: '/homepage/tags',

  TAG_LIST: '/tags',
  TAG_DETAIL: '/tags/:id',

  USER_LIST: '/users',
  BADGED_USER_LIST: '/badged_users',
  USER_DETAIL: '/users/:id',

  ARTICLE_LIST: '/articles',
  ARTICLE_DETAIL: '/articles/:id',

  COMMENT_LIST: '/comments',
  COMMENT_DETAIL: '/comments/:id',

  OAUTH_CLIENT_LIST: '/oauth-clients',
  OAUTH_CLIENT_DETAIL: '/oauth-clients/:id',

  FEEDBACK: '/feedback',

  LOGIN: '/auth/login/',

  BLOCK_LIST: '/blocklist',
  BLOCK_LIST_DOMAIN: '/blocklist_domain',

  FEATURE_FLAG: '/feature_flag',

  SEEDING_USER_LIST: '/seeding_users',

  ANNOUNCEMENTS: '/announcements',
  ANNOUNCEMENT_DETAIL: '/announcement/:id',
}

export const PAGE_TITLE = {
  [PATH.HOMEPAGE]: '首頁',
  [PATH.HOMEPAGE_HOTTEST]: '熱門文章',
  [PATH.HOMEPAGE_NEWEST]: '最新發布',
  [PATH.HOMEPAGE_ICYMI]: '不要錯過',
  [PATH.HOMEPAGE_AUTHORS]: '活躍作者',
  [PATH.HOMEPAGE_TAGS]: '標籤',

  [PATH.TAG_LIST]: '標籤清單',
  [PATH.TAG_DETAIL]: '標籤詳情',

  [PATH.USER_LIST]: '用戶清單',
  [PATH.BADGED_USER_LIST]: '徽章用戶清單',
  [PATH.USER_DETAIL]: '用戶詳情',

  [PATH.ARTICLE_LIST]: '文章清單',
  [PATH.ARTICLE_DETAIL]: '文章詳情',

  [PATH.COMMENT_LIST]: '評論清單',
  [PATH.COMMENT_DETAIL]: '評論詳情',

  [PATH.OAUTH_CLIENT_LIST]: 'OAuth Client 清單',
  [PATH.OAUTH_CLIENT_DETAIL]: 'OAuth Client 詳情',

  [PATH.FEEDBACK]: '反饋',

  [PATH.LOGIN]: '登入',

  [PATH.BLOCK_LIST]: '自動封鎖清單',
  [PATH.BLOCK_LIST_DOMAIN]: '網域封鎖清單',
  [PATH.FEATURE_FLAG]: '功能開關',
  [PATH.SEEDING_USER_LIST]: '內測種子用戶清單',
  [PATH.ANNOUNCEMENTS]: '公告清單',
  [PATH.ANNOUNCEMENT_DETAIL]: '公告',
}

export const PATH_REGEXP = {
  articleDetail: /^\/@([^@\/]+?)\/.*-([^-\/]+?)(?:\/)?$/i,
  user: /^\/@([^@\/]+?)(?:\/)?$/i,
}
