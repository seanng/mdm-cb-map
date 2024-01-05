import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import locale_zh from 'dayjs/locale/zh-tw'

dayjs.extend(relativeTime)
dayjs.locale('zh-TW', locale_zh)

export function RelativeDate({ dateString }: { dateString?: string }) {
  if (!dateString) return <div />
  return <time dateTime={dateString}>{dayjs(dateString).fromNow()}</time>
}
