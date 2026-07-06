import { PutObjectCommand } from '@aws-sdk/client-s3'

import { getR2Bucket, getR2Client } from './client'
import { buildKey, buildPublicUrl, type ImageDir } from './path'

/**
 * @param sourceUrl   Image's URL (e.g., Notion's image URL)
 * @param dir         works | notes
 * @param notionId    Notion page ID
 * @param version     last_edited_time
 */
export async function persistImage(
  sourceUrl: string,
  dir: ImageDir,
  notionId: string,
  version: string
): Promise<string> {
  const bucket = getR2Bucket()
  const client = getR2Client()
  const key = buildKey(dir, notionId)

  const res = await fetch(sourceUrl)
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.status} ${sourceUrl}`)
  }
  const body = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') ?? 'image/png'

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  )

  return buildPublicUrl(key, version)
}
