import * as React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = 'Asia/Hong_Kong'

type DateTimeProps = {
  date: Date
  dateOnly?: boolean
}

const DateTime: React.FC<DateTimeProps> = ({ date, dateOnly }) => {
  if (!date) {
    return <span>無</span>
  }

  const isThisYear = dayjs(date).isSame(new Date(), 'year')

  if (isThisYear) {
    if (dateOnly) {
      return <span>{dayjs(date).tz(tz).format('MM-DD Z')}</span>
    }
    return <span>{dayjs(date).tz(tz).format('MM-DD HH:mm Z')}</span>
  }

  if (dateOnly) {
    return <span>{dayjs(date).tz(tz).format('YYYY-MM-DD Z')}</span>
  }
  return <span>{dayjs(date).tz(tz).format('YYYY-MM-DD HH:mm Z')}</span>
}

export default DateTime
