import type { FrameworkStat } from '@/lib/github'

export function FrameworkCards({ frameworks }: { frameworks: FrameworkStat[] }) {
  if (frameworks.length === 0) {
    return <p className="text-sm text-white/50">No framework data available.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {frameworks.map((framework) => (
        <div
          key={framework.name}
          className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
        >
          <span className="font-sans text-lg font-bold">{framework.name}</span>
          <span className="font-sans text-lg font-bold tabular-nums">
            {framework.repoCount}
            <span className="ml-1.5 text-sm font-normal text-white/40">
              {framework.repoCount === 1 ? 'repo' : 'repos'}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
