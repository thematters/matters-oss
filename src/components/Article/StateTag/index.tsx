import * as React from 'react'

import LevelTag, { LevelEnum } from '../../../components/LevelTag'

const StateMap = {
  active: {
    level: LevelEnum.SUCCESS,
    text: '正常',
  },
  archived: {
    level: LevelEnum.INFO,
    text: '隱藏',
  },
  banned: {
    level: LevelEnum.ERROR,
    text: '強制隱藏',
  },
}

const StateTag = ({ state }: { state: 'active' | 'archived' | 'banned' }) => {
  const { level, text } = StateMap[state]
  return <LevelTag level={level}>{text}</LevelTag>
}

export default StateTag
