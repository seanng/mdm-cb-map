import { ModuleHeaderText } from './ModuleHeaderText'
import { Swiper, SwiperSlide, Navigation, EffectFade } from 'libs/swiper'
import { NewsletterShowcasedPost } from './NewsletterShowcasedPost'

export function NewsletterSection({ posts }: { posts: PostPayload[] }) {
  return (
    <section className="relative rounded-md bg-white divide-y">
      {/* Header */}
      <div className="max-w-[90vw] overflow-hidden pl-7">
        <div className="py-2">
          <ModuleHeaderText value="熱門資訊" bold />
        </div>
      </div>
      <div className="px-2.5 py-3 flex h-[388px]">
        <div className="flex-none w-swiper-showcase-width relative h-full">
          <Swiper
            modules={[EffectFade, Navigation]}
            effect="fade"
            navigation
            loop
            className="swiper-showcase"
          >
            {posts.map((post, i) => (
              <SwiperSlide key={i}>
                <NewsletterShowcasedPost post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-1/4"></div>
      </div>
    </section>
  )
}
