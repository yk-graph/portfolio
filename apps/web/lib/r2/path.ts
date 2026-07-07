export const R2_PUBLIC_BASE = 'https://images.yk-graph.com'

export type ImageDir = 'works' | 'notes'

export function buildKey(dir: ImageDir, notionId: string): string {
  return `portfolio/${dir}/${notionId}`
}

export function buildPublicUrl(key: string, version: string): string {
  return `${R2_PUBLIC_BASE}/${key}?v=${encodeURIComponent(version)}`
}
