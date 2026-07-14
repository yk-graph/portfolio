import { getGithubToken, getGithubUsername } from './client'
import type { ContributionCalendar, ContributionLevel, GithubSkill, LanguageStat } from './types'

const REVALIDATE_SECONDS = 3600
const TOP_LANGUAGES = 6

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
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
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
          languages: { edges: { size: number; node: { name: string; color: string | null } }[] }
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
  const totals = new Map<string, { color: string; size: number }>()

  for (const repo of raw!.user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const current = totals.get(edge.node.name)
      totals.set(edge.node.name, {
        color: edge.node.color ?? '#7f9cd1',
        size: (current?.size ?? 0) + edge.size,
      })
    }
  }

  const grandTotal = [...totals.values()].reduce((sum, entry) => sum + entry.size, 0)
  if (grandTotal === 0) return []

  return [...totals.entries()]
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, TOP_LANGUAGES)
    .map(([name, entry]) => ({
      name,
      color: entry.color,
      percentage: Math.round((entry.size / grandTotal) * 100),
    }))
}

export async function getGithubSkill(): Promise<GithubSkill> {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getGithubToken()}`,
        'Content-Type': 'application/json',
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
    }
  } catch (error: unknown) {
    console.error('getGithubSkill: unexpected error', { error })
    return EMPTY_SKILL
  }
}
