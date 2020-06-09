import * as React from 'react'

import LevelTag, { LevelEnum } from '../../components/LevelTag'
import { FeatureFlag } from './withSetFeature'

const FlagMap = {
  on: {
    level: LevelEnum.SUCCESS,
    text: '打開'
  },
  admin: {
    level: LevelEnum.WARNING,
    text: '管理員可見'
  },
  off: {
    level: LevelEnum.ERROR,
    text: '關閉'
  }
}

export const FlagTag = ({ flag }: { flag: FeatureFlag }) => {
  const { level, text } = FlagMap[flag]
  return <LevelTag level={level}>{text}</LevelTag>
}

export const EnableTag = ({ enable }: { enable: boolean }) => (
  <LevelTag level={enable ? LevelEnum.SUCCESS : LevelEnum.ERROR}>
    {enable ? '可用' : '不可用'}
  </LevelTag>
)
