import { getGithubToken, getGithubUsername } from './client'
import type { ContributionCalendar, ContributionLevel, GithubSkill, LanguageStat } from './types'

const REVALIDATE_SECONDS = 3600
const TOP_LANGUAGES = 10

const LEVEL_BY_ENUM: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const EMPTY_SKILL: GithubSkill = {
  calendar: { totalContributions: 0, weeks: [] },
  languages: [],
  profileUrl: '',
}

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          languages(first: 20) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`

type GithubGraphQLResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[]
        }
      }
      repositories: {
        nodes: {
          languages: { nodes: { name: string }[] }
        }[]
      }
    }
  }
  errors?: { message: string }[]
}

function mapCalendar(raw: GithubGraphQLResponse['data']): ContributionCalendar {
  const calendar = raw!.user.contributionsCollection.contributionCalendar
  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_BY_ENUM[day.contributionLevel] ?? 0,
      }))
    ),
  }
}

function mapLanguages(raw: GithubGraphQLResponse['data']): LanguageStat[] {
  const repoCounts = new Map<string, number>()

  for (const repo of raw!.user.repositories.nodes) {
    for (const language of repo.languages.nodes) {
      repoCounts.set(language.name, (repoCounts.get(language.name) ?? 0) + 1)
    }
  }

  return [...repoCounts.entries()]
    .map(([name, repoCount]) => ({ name, repoCount }))
    .sort((a, b) => b.repoCount - a.repoCount || a.name.localeCompare(b.name))
    .slice(0, TOP_LANGUAGES)
}

export async function getGithubSkill(): Promise<GithubSkill> {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getGithubToken()}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-skill-page',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: getGithubUsername() } }),
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      console.error('getGithubSkill: GitHub API error', { status: response.status })
      return EMPTY_SKILL
    }

    const json: GithubGraphQLResponse = await response.json()
    if (json.errors?.length || !json.data) {
      console.error('getGithubSkill: GraphQL errors', { errors: json.errors })
      return EMPTY_SKILL
    }

    return {
      calendar: mapCalendar(json.data),
      languages: mapLanguages(json.data),
      profileUrl: `https://github.com/${getGithubUsername()}`,
    }
  } catch (error: unknown) {
    console.error('getGithubSkill: unexpected error', { error })
    return EMPTY_SKILL
  }
}
