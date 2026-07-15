import { createHmac, timingSafeEqual } from 'crypto'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { getNotionWebhookSecret } from '@/lib/notion'

export const runtime = 'nodejs'

function isValidSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false

  const expected = `sha256=${createHmac('sha256', getNotionWebhookSecret()).update(rawBody).digest('hex')}`
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) return false
  return timingSafeEqual(expectedBuffer, signatureBuffer)
}

export async function POST(request: Request) {
  const rawBody = await request.text()

  let payload: { verification_token?: string }
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (payload.verification_token) {
    console.info('Notion webhook verification_token:', payload.verification_token)
    return NextResponse.json({ received: true })
  }

  if (!isValidSignature(rawBody, request.headers.get('X-Notion-Signature'))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  revalidatePath('/[lang]', 'page')
  revalidatePath('/[lang]/notes/[id]', 'page')

  return NextResponse.json({ revalidated: true })
}
