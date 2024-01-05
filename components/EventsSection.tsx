'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { SectionScrollOffset } from 'components/SectionScrollOffset'
import { EVENTS_SECTION_KEY } from 'constants/index'
import { useSection } from 'hooks/useSection'
import { ModuleHeaderText } from './ModuleHeaderText'
import Image from 'next/image'
import { urlForImage } from 'libs/sanity.image'
import Link from 'next/link'
import dayjs from 'dayjs'

function SectionHeader() {
  return (
    <div className="overflow-hidden pl-7">
      <div className="py-2">
        <ModuleHeaderText value="跨境活動" bold />
      </div>
    </div>
  )
}

function EventTitle({ children }) {
  return (
    <div className="mt-2.5 text-sm font-bold text-gray-700">{children}</div>
  )
}

function EventDetails({
  startsAt,
  location,
}: {
  startsAt?: string
  location?: string
}) {
  return (
    <div className="my-1.5 text-xs text-gray-500 flex">
      {location && <div>{location}</div>}
      <div className="mx-2">•</div>
      {startsAt && (
        <time dateTime={startsAt}>
          {dayjs(startsAt).format('M月D日 h:mma')}
        </time>
      )}
    </div>
  )
}

const IMAGE_WIDTH = 340
const IMAGE_HEIGHT = 170

interface EventsSectionProps {
  events: EventPayload[]
  navIdx: number
}
export function EventsSection({ events, navIdx }: EventsSectionProps) {
  const { ref } = useSection(navIdx)

  return (
    <section className="relative rounded-md bg-white divide-y" ref={ref}>
      <SectionScrollOffset id={EVENTS_SECTION_KEY} />
      <SectionHeader />
      <div className="px-4 py-3">
        {/* swiper */}
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          modules={[Navigation]}
          navigation
          className="swiper-events"
        >
          {events.map((event, i) => (
            <SwiperSlide key={event._id ?? i}>
              <Link href={event?.url ?? 'https://cb-map.com'} target="_blank">
                <Image
                  style={{ objectFit: 'cover' }}
                  alt={event.title}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  src={
                    event?.coverImage?.asset?._ref
                      ? urlForImage(event.coverImage)
                          ?.width(IMAGE_WIDTH)
                          .height(IMAGE_HEIGHT)
                          .fit('crop')
                          .auto('format')
                          .url()
                      : `https://source.unsplash.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}/?event`
                  }
                />
                <EventTitle>{event?.title ?? 'Placeholder Title'}</EventTitle>
                <EventDetails
                  startsAt={event.startsAt}
                  location={event.location}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
