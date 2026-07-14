export function getGithubToken(): string {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN is not set.')
  return token
}

export function getGithubUsername(): string {
  const login = process.env.GITHUB_USERNAME
  if (!login) throw new Error('GITHUB_USERNAME is not set.')
  return login
}
