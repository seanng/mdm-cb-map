type SanityImage = import('sanity').Image

interface Base {
  _id: string
  _rev: string
  _type: string
  _createdAt: string
  _updatedAt: string
}

interface NewsArticlePayload {
  _id: string
  title: string
  url: string
  date: string
  coverImage?: SanityImage
  publication: NewsPublicationPayload
}

interface EventPayload {
  _id: string
  title: string
  url: string
  organizer: string
  location: string
  startsAt: string
  coverImage?: SanityImage
}

type NewsPublicationLanguage = 'tw' | 'en' | 'cn'

interface NewsPublicationPayload {
  name: string
  language: NewsPublicationLanguage
  picture?: SanityImage
}

interface PostPayload {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  excerpt?: string
  slug?: string
  content?: any
  author?: AuthorPayload
}

interface AuthorPayload {
  name: string
  picture?: SanityImage
}

interface HomePagePayload {
  home: {
    title: string
    modules: ModulePayload[]
  }
  posts: PostPayload[]
  newsArticles: NewsArticlePayload[]
  events: EventPayload[]
}

interface ModulePayload {
  _key: string
  title: string
  columns: string
  shouldBoldLinkTitles: boolean
  adTitle?: string
  adUrl?: string
  tabs: ModuleTabPayload[]
}

interface ModuleTabPayload {
  title: string
  links: ModuleLinkPayload[]
}

interface ModuleLinkPayload {
  title: string
  url: string
  logo: SanityImage
  description: string
}
