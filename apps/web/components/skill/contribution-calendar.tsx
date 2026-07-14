import type { ContributionCalendar as ContributionCalendarData } from '@/lib/github'

const LEVEL_COLORS = ['rgba(255,255,255,0.08)', '#0e4429', '#006d32', '#26a641', '#39d353']

export function ContributionCalendar({ calendar }: { calendar: ContributionCalendarData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-heading text-sm font-bold tracking-widest text-white/70">
        {calendar.totalContributions} contributions in the last year
      </p>

      {calendar.weeks.length === 0 ? (
        <p className="text-sm text-white/50">No contribution data available.</p>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {calendar.weeks.flatMap((week) =>
              week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.date}: ${day.count}`}
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
