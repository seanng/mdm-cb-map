import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  excerpt,
  "author": author->{name, picture},
  coverImage,
  "slug": slug.current,
`

export const homePageQuery = groq`
{
  "home": *[_type == "home"][0] {
    title,
    modules[] {
      _key,
      _id,
      title,
      shouldBoldLinkTitles,
      columns,
      adTitle,
      adUrl,
      tabs[]->{
        title,
        links[] {
          title,
          url,
          logo,
          description
        }
      }
    }
  },
  "posts": *[_type == "post"] | order(date desc, _updatedAt desc) [0...10] {
    ${postFields}
  },
  "events": *[_type == "event" && dateTime(startsAt) > dateTime(now()) ] | order(startsAt asc) [0...10] {
    _id,
    title,
    url,
    organizer,
    location,
    startsAt,
    coverImage,
  },
  "newsArticles": *[_type == "newsArticle"] | order(featured desc, date desc) [0...10] {
    _id,
    title,
    featured,
    date,
    url,
    coverImage,
    "publication": newsPublication->{name, picture, language},
  }
}
`
export const postAndMorePostsQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
