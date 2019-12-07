import * as React from 'react'

import LevelTag, { LevelEnum } from '../../../components/LevelTag'

const StateTag = ({ deleted }: { deleted: boolean }) => {
  if (typeof deleted === 'undefined' || deleted === null) {
    return null
  }
  const level = deleted ? LevelEnum.INFO : LevelEnum.SUCCESS
  const text = deleted ? '已隱藏' : '正常'
  return <LevelTag level={level}>{text}</LevelTag>
}

export default StateTag
