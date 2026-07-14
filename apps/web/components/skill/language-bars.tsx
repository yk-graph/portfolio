import type { LanguageStat } from '@/lib/github'

export function LanguageBars({ languages }: { languages: LanguageStat[] }) {
  if (languages.length === 0) {
    return <p className="text-sm text-white/50">No language data available.</p>
  }

  return (
    <ul className="flex flex-col gap-7">
      {languages.map((language) => (
        <li key={language.name} className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-base font-black sm:text-lg">{language.name}</span>
            <span className="font-heading text-sm font-bold sm:text-base">{language.percentage}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-white/15">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${language.percentage}%`, backgroundColor: language.color }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
