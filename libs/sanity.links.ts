export async function resolveHref(
  documentType?: string,
  slug?: string
): Promise<string | undefined> {
  switch (documentType) {
    case 'home':
      return '/'
    case 'post':
      // Check if the post with the given `slug` exists
      return slug ? `/posts/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
