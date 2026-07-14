export function getGithubToken(): string {
  const token = process.env.GH_TOKEN
  if (!token) throw new Error('GH_TOKEN is not set.')
  return token
}

export function getGithubUsername(): string {
  const login = process.env.GH_USERNAME
  if (!login) throw new Error('GH_USERNAME is not set.')
  return login
}
