export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
}

export type ContributionCalendar = {
  totalContributions: number
  weeks: ContributionDay[][]
}

export type LanguageStat = {
  name: string
  repoCount: number
}

export type GithubSkill = {
  calendar: ContributionCalendar
  languages: LanguageStat[]
}
