import clsx from 'clsx'

interface Props {
  value: string
  bold: boolean
}

export function ModuleHeaderText({ value, bold }: Props) {
  return (
    <span
      className={clsx(
        'text-base text-gray-500',
        bold && 'font-bold text-gray-700'
      )}
    >
      {value}
    </span>
  )
}
