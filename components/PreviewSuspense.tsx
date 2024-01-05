'use client'
import { PreviewSuspense as BasePreviewSuspense } from 'next-sanity/preview'

// Wrapper with default fallback prop
export function PreviewSuspense({
  fallback = <DefaultFallback />,
  children,
}: {
  fallback?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <BasePreviewSuspense fallback={fallback}>{children}</BasePreviewSuspense>
  )
}

function DefaultFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-bold">Loading Studio Preview...</div>
    </div>
  )
}
