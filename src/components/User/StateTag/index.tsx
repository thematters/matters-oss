import * as React from 'react'

import { UserState } from '../SetState/withSetState'

import LevelTag, { LevelEnum } from '../../../components/LevelTag'

const StateMap = {
  null: {
    level: LevelEnum.NULL,
    text: '無',
  },
  active: {
    level: LevelEnum.SUCCESS,
    text: '正常',
  },
  archived: {
    level: LevelEnum.WARNING,
    text: '註銷',
  },
  banned: {
    level: LevelEnum.ERROR,
    text: '禁言',
  },
  frozen: {
    level: LevelEnum.ERROR,
    text: '凍結',
  },
  onboarding: {
    level: LevelEnum.INFO,
    text: '未激活',
  },
}

const StateTag = ({ state }: { state: UserState }) => {
  const { level, text } = StateMap[state]
  return <LevelTag level={level}>{text}</LevelTag>
}

export default StateTag
