import React, { ReactNode } from 'react'

import { SidebarProvider } from 'contexts/sidebar'
import { TopSection } from './TopSection'
import { Layout } from 'components/Layout'
import { LeftSidebar } from './LeftSidebar'
import { ModuleSection } from './ModuleSection'
import { HolidaysSection } from './HolidaysSection'
import { TimezonesSection } from './TimezonesSection'
import { NewsSection } from './NewsSection'
import { RightSidebar } from './RightSidebar'
import {
  NEWS_SECTION_TITLE,
  NEWS_SECTION_KEY,
  EVENTS_SECTION_TITLE,
  EVENTS_SECTION_KEY,
} from 'constants/index'
import { EventsSection } from './EventsSection'

interface HomePageProps {
  data: HomePagePayload
  children?: ReactNode
}

/**
 * This is the meat of the app. It renders the entire page and organizes the modules.
 */
export function HomePage({ data, children }: HomePageProps) {
  const {
    home: { modules },
    newsArticles,
    events,
  } = data

  const sidebarTabbedModules = modules.map(({ title, _key }) => ({
    title,
    _key,
  }))

  /** 
   * Since the News and Events sections are special modules that do not follow the same structure as the other modules,
   * they are added to the sidebar separately. Their placements are specific to the design specs of my partner.
   */
  const sidebarModules = [
    ...sidebarTabbedModules.slice(0, 2),
    {
      title: NEWS_SECTION_TITLE,
      _key: NEWS_SECTION_KEY,
    },
    {
      title: EVENTS_SECTION_TITLE,
      _key: EVENTS_SECTION_KEY,
    },
    ...sidebarTabbedModules.slice(2),
  ]

  // The modules are organized in a specific order in accordance to rigid design specs.
  return (
    <>
      <SidebarProvider>
        <TopSection />
        <Layout>
          {/* Content */}
          <div className="px-3">
            {/* Left Nav */}
            <nav className="hidden lg:flex flex-col sticky top-4 left-3 w-[8.33%] float-left">
              <LeftSidebar data={sidebarModules} />
            </nav>
            {/* Modules */}
            <main className="flex flex-col gap-y-4 lg:w-[91.66%]">
              <TimezonesSection />
              <ModuleSection data={modules[0]} navIdx={0} />
              <HolidaysSection />
              <ModuleSection data={modules[1]} navIdx={1} />
              {/* Exchange Rate Server Component */}
              {children}
              <NewsSection navIdx={2} articles={newsArticles} />
              <EventsSection navIdx={3} events={events} />
              <ModuleSection data={modules[2]} navIdx={4} />
              {modules.slice(3).map((module, i) => (
                <ModuleSection key={module._key} data={module} navIdx={i + 5} />
              ))}
            </main>
          </div>
        </Layout>
      </SidebarProvider>
      <RightSidebar />
    </>
  )
}
