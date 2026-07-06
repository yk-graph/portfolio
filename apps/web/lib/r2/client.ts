import { S3Client } from '@aws-sdk/client-s3'

let client: S3Client | undefined

export function getR2Client(): S3Client {
  if (!client) {
    const accountId = process.env.R2_ACCOUNT_ID
    const accessKeyId = process.env.R2_ACCESS_KEY_ID
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
    if (!accountId) throw new Error('R2_ACCOUNT_ID is not set.')
    if (!accessKeyId) throw new Error('R2_ACCESS_KEY_ID is not set.')
    if (!secretAccessKey) throw new Error('R2_SECRET_ACCESS_KEY is not set.')

    client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    })
  }
  return client
}

export function getR2Bucket(): string {
  const bucket = process.env.R2_BUCKET
  if (!bucket) throw new Error('R2_BUCKET is not set.')
  return bucket
}
