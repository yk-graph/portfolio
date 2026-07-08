export type Work = {
  id: string
  title: string
  summary: string
  description?: string
  tags: string[]
  thumbnail: string
  liveUrl?: string
  repoUrl?: string
  createdAt: string
  updatedAt: string
}

export type Note = {
  id: string
  title: string
  thumbnail: string
  createdAt: string
  updatedAt: string
}
