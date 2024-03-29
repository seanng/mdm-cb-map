export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.error('Must be a POST request')
    return res.status(401).json({ message: 'Must be a POST request' })
  }

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
