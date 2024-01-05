'use client'

import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [currentNavIdx, setCurrentNavIdx] = useState(0)

  return (
    <SidebarContext.Provider value={{ currentNavIdx, setCurrentNavIdx }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
