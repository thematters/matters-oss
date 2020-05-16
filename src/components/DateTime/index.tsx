import * as React from 'react'
import TimeAgo from 'react-timeago'

import { timeFormat } from '../../utils'

type DateTimeProps = {
  date: Date
}

const formatter = (
  value: number,
  unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year',
  suffix: string
) => {
  if (unit === 'second') return '剛剛'

  const formattedUnit = {
    minute: '分鐘',
    hour: '小時',
    day: '日',
    week: '週',
    month: '月',
    year: '年',
  }[unit]

  return `${value} ${formattedUnit}${suffix === 'ago' ? '前' : '後'}`
}

class DateTime extends React.Component<DateTimeProps> {
  render() {
    const { date, ...props } = this.props

    return (
      <span>
        {timeFormat.en.render(new Date(date))} (
        <TimeAgo
          date={date}
          formatter={formatter}
          title={timeFormat.zh.render(new Date(date))}
          {...props}
        />
        )
      </span>
    )
  }
}

export default DateTime
