import type { LanguageStat } from '@/lib/github'

export function LanguageList({ languages }: { languages: LanguageStat[] }) {
  if (languages.length === 0) {
    return <p className="text-sm text-white/50">No language data available.</p>
  }

  return (
    <ol className="flex flex-col divide-y divide-white/10">
      {languages.map((language, index) => (
        <li key={language.name} className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <span className="font-sans text-sm font-bold tabular-nums text-white/40">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-sans text-lg font-bold">{language.name}</span>
          </div>
          <span className="font-sans text-lg font-bold tabular-nums">
            {language.repoCount}
            <span className="ml-1.5 text-sm font-normal text-white/40">
              {language.repoCount === 1 ? 'repo' : 'repos'}
            </span>
          </span>
        </li>
      ))}
    </ol>
  )
}
