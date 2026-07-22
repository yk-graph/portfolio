import { Icon } from '@repo/ui'

import type { ContributionCalendar as ContributionCalendarData } from '@/lib/github'

const LEVEL_COLORS = ['rgba(255,255,255,0.08)', '#0e4429', '#006d32', '#26a641', '#39d353']

function tooltipPosition(isLeftHalf: boolean, isTopHalf: boolean): string {
  if (isTopHalf) {
    return isLeftHalf ? 'top-full left-full mt-1 ml-1' : 'top-full right-full mt-1 mr-1'
  }
  return isLeftHalf ? 'bottom-full left-full mb-1 ml-1' : 'bottom-full right-full mb-1 mr-1'
}

export function ContributionCalendar({
  calendar,
  contributionsLabel,
  profileUrl,
}: {
  calendar: ContributionCalendarData
  contributionsLabel: string
  profileUrl: string
}) {
  const totalWeeks = calendar.weeks.length

  return (
    <div className="flex flex-col gap-2">
      <p className="font-heading text-sm font-bold tracking-widest text-white/70">
        {contributionsLabel.replace('{count}', calendar.totalContributions.toLocaleString())}
      </p>

      {calendar.weeks.length === 0 ? (
        <p className="text-sm text-white/50">No contribution data available.</p>
      ) : (
        <>
          <div className="overflow-x-auto px-1 py-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {calendar.weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <span key={day.date} className="group relative h-3 w-3">
                    <span
                      className="block h-full w-full rounded-sm"
                      style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                    />
                    <span
                      className={`pointer-events-none absolute z-10 hidden whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block ${tooltipPosition(weekIndex < totalWeeks / 2, dayIndex < 3.5)}`}
                    >
                      {day.count} contributions on {day.date}
                    </span>
                  </span>
                ))
              )}
            </div>
          </div>

          {profileUrl && (
            <div className="flex justify-end">
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Icon name="github" size={18} />
                {profileUrl.replace('https://github.com/', '@')}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  )
}
