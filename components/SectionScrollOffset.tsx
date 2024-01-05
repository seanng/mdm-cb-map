interface Props {
  id: string
}

export function SectionScrollOffset({ id }: Props) {
  return <div id={id} className="absolute -top-4" />
}
