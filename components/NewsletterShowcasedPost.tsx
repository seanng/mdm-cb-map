import { urlForImage } from 'libs/sanity.image'
import {
  SWIPER_SHOWCASE_HEIGHT,
  SWIPER_SHOWCASE_WIDTH,
} from 'constants/metrics'
import Image from 'next/image'

export function NewsletterShowcasedPost({ post }: { post: PostPayload }) {
  return (
    <>
      <Image
        style={{ objectFit: 'cover' }}
        alt={post.title}
        fill
        src={
          post?.coverImage?.asset?._ref
            ? urlForImage(post.coverImage)
                ?.width(SWIPER_SHOWCASE_WIDTH)
                .height(SWIPER_SHOWCASE_HEIGHT)
                .fit('crop')
                .auto('format')
                .url()
            : `https://source.unsplash.com/${SWIPER_SHOWCASE_WIDTH}x${SWIPER_SHOWCASE_HEIGHT}/?event`
        }
      />
    </>
  )
}
