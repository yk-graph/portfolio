import { SectionShell } from '@/components/section'

export default function SectionsLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <>
      <SectionShell>{children}</SectionShell>
      {modal}
    </>
  )
}
