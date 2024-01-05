import home from './home'
import module from './module'
import moduleTab from './moduleTab'
import moduleLink from './moduleLink'
import newsArticle from './newsArticle'
import newsPublication from './newsPublication'
import post from './post'
import author from './author'
import event from './event'

export const singletonPages = [home]

export const schemaTypes = [
  ...singletonPages,
  module,
  moduleTab,
  moduleLink,
  newsArticle,
  newsPublication,
  post,
  author,
  event,
]

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
  home.name,
  post.name,
  newsArticle.name,
  event.name,
]
