const tinytime = require('tinytime')

const padOptoons = { padMonth: true, padDays: true, padHours: true }

export const timeFormat = {
  zh: tinytime('{YYYY} 年 {Mo} 月 {DD} 日 {H} 时 {mm} 分 {ss} 秒', padOptoons),
  en: tinytime('{YYYY}-{Mo}-{DD} {H}:{mm}:{ss}', padOptoons)
}

export const dateFormat = tinytime('{YYYY} 年 {Mo} 月 {DD} 日', padOptoons)
export const monthDayFormat = tinytime('{Mo} 月 {DD} 日')
export const standardDateFormat = tinytime('{YYYY}-{Mo}-{DD}', padOptoons)
