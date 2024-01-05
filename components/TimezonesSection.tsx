'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Image from 'next/image'

dayjs.extend(utc)
dayjs.extend(timezone)

const timezones = [
  {
    flag: '/images/timezone/tw.png',
    title: '台北',
    timeZone: 'Asia/Taipei',
    fromUtc: 'GMT+8',
  },
  {
    flag: '/images/timezone/us.png',
    title: '美東',
    timeZone: 'America/New_York',
    fromUtc: 'GMT-5',
  },
  {
    flag: '/images/timezone/us.png',
    title: '美西',
    timeZone: 'America/Los_Angeles',
    fromUtc: 'GMT-8',
  },
  {
    flag: '/images/timezone/uk.png',
    title: '倫敦',
    timeZone: 'Europe/London',
    fromUtc: 'GMT+0',
  },
  {
    flag: '/images/timezone/fr.png',
    title: '巴黎',
    timeZone: 'Europe/Paris',
    fromUtc: 'GMT+1',
  },
  {
    flag: '/images/timezone/jp.png',
    title: '東京',
    timeZone: 'Asia/Tokyo',
    fromUtc: 'GMT+9',
  },
]

export function TimezonesSection() {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hidden sm:flex items-center justify-between border -mb-1 py-1 px-2 rounded-md border-[#eee]">
      {timezones.map((timezone) => (
        <Timezone key={timezone.title} date={date} {...timezone} />
      ))}
    </section>
  )
}

interface Props {
  timeZone: string
  date: Date
  flag: string
  title: string
  fromUtc: string
}

function Timezone({ date, timeZone, flag, title, fromUtc }: Props) {
  return (
    <div className="flex items-center justify-between text-gray-500 text-xs">
      <span className="hidden lg:block">
        {flag && <Image src={flag} alt={title} width={18} height={12} />}
      </span>
      <span className="mx-1 lg:mx-2">{title}</span>
      <span className="md:hidden font-sans">
        {dayjs.tz(date, timeZone).format('HH:mm')}
      </span>
      <span className="hidden md:inline text-[13px]">
        {dayjs.tz(date, timeZone).format('MM-DD HH:mm')}
        <span className="hidden 2xl:inline">&nbsp;({fromUtc})</span>
      </span>
    </div>
  )
}
