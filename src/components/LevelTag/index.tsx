import * as React from 'react'
import { Tag } from 'antd'

export enum LevelEnum {
  NULL,
  SUCCESS,
  INFO,
  WARNING,
  ERROR,
}
type LevelTagProps = {
  level: LevelEnum
  children?: React.ReactNode
}

export const LevelColorMap = {
  [LevelEnum.NULL]: 'grey',
  [LevelEnum.SUCCESS]: '#4e8764',
  [LevelEnum.INFO]: undefined,
  [LevelEnum.WARNING]: 'orange',
  [LevelEnum.ERROR]: 'red',
}

export default ({ level, children }: LevelTagProps) => (
  <Tag color={LevelColorMap[level]}>{children}</Tag>
)
