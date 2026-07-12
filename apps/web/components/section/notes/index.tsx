import { NotesData } from './data'

export function NotesSection({ lang }: { lang: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-8 px-6 py-14 sm:px-10">
      <h2 className="font-heading text-6xl font-black leading-none sm:text-7xl">Notes</h2>
      <NotesData lang={lang} />
    </div>
  )
}
