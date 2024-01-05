'use client'

import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'
import allHolidays from 'data/holidays-list'

dayjs.extend(weekOfYear)
dayjs.extend(relativeTime)

function getNextHolidayIdx(now, year) {
  const nextHolidayIdx = allHolidays.findIndex((holiday) => {
    const holidayDate = dayjs(`${year}-${holiday.date}`)
    return holidayDate.diff(now, 'day') >= 0
  })
  return nextHolidayIdx
}

const now = dayjs()
const week = now.week()
const year = now.year()

export function HolidaysSection() {
  const [shownHolidays, setShownHolidays] = useState([])
  const daysUntilNewYear = dayjs(`${year + 1}-01-01`).diff(now, 'day')

  useEffect(() => {
    const nextHolidayIdx = getNextHolidayIdx(now, year)
    setShownHolidays(allHolidays.slice(nextHolidayIdx, nextHolidayIdx + 4))
  }, [])

  return (
    <div className="flex items-center justify-between border -my-1 py-1 px-2 rounded-md border-[#eee]">
      <p className="text-sm tracking-wider font-normal text-gray-500 lg:mr-10 xl:mr-20">
        {year}年第<span className="mx-1 text-orange-600">{week}</span>周，距
        {year + 1}
        年還有<span className="mx-1 text-orange-600">{daysUntilNewYear}</span>天
      </p>
      <div className="hidden lg:flex grow justify-between">
        {shownHolidays.map((holiday, i) => (
          <p
            className="text-[13px] tracking-wider font-normal text-gray-500"
            key={holiday.title}
          >
            距<span className="mx-0.5 text-blue-500">{holiday.title}</span>還有
            <span className="mx-0.5 text-orange-600">
              {dayjs(`${year}-${holiday.date}`).diff(now, 'day')}
            </span>
            天
          </p>
        ))}
      </div>
    </div>
  )
}

function Holiday() {
  return <div></div>
}
