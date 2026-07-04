import { SectionPager, HomeSection, WorksSection, NotesSection, ContactSection } from '@/components'

export default function Home() {
  return (
    <SectionPager
      content={{
        home: <HomeSection />,
        works: <WorksSection />,
        notes: <NotesSection />,
        contact: <ContactSection />,
      }}
    />
  )
}
