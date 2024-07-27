import * as React from 'react'

import LevelTag, { LevelEnum } from '../../../components/LevelTag'

const StateMap = {
  active: {
    level: LevelEnum.SUCCESS,
    text: '正常',
  },
  pending: {
    level: LevelEnum.INFO,
    text: '編輯中',
  },
  finished: {
    level: LevelEnum.SUCCESS,
    text: '已結束',
  },
  archived: {
    level: LevelEnum.ERROR,
    text: '已隱藏',
  },
}

const StateTag = ({
  state,
}: {
  state: 'active' | 'pending' | 'finished' | 'archived'
}) => {
  const { level, text } = StateMap[state]
  return <LevelTag level={level}>{text}</LevelTag>
}

export default StateTag
