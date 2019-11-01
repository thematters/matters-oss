import * as React from 'react'

import LevelTag, { LevelEnum } from '../../../components/LevelTag'

const RoleMap = {
  user: {
    level: LevelEnum.SUCCESS,
    text: '用戶'
  },
  admin: {
    level: LevelEnum.WARNING,
    text: '管理員'
  }
}

const RoleTag = ({ role }: { role: 'user' | 'admin' }) => {
  const { level, text } = RoleMap[role]
  return <LevelTag level={level}>{text}</LevelTag>
}

export default RoleTag
