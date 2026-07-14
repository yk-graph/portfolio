import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CareerTimeline } from '@/components/about'
import { BackNavigation } from '@/components/common'
import { getCareer } from '@/lib/content'
import { hasLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/i18n/dictionaries'

export const metadata: Metadata = {
  title: 'About',
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = (await getDictionary(lang)).about
  const career = await getCareer(lang)

  return (
    <div className="min-h-dvh overflow-hidden text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-6 sm:px-10">
        <header className="relative z-20">
          <BackNavigation />
        </header>

        <section className="flex flex-col">
          <h1 className="relative z-10 mt-10 sm:mt-20 font-heading text-[clamp(3rem,10vw,5rem)] font-black leading-[1.1]">
            {t.greeting.map((line, i) => (
              <span key={i}>
                {line}
                {i < t.greeting.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="relative z-10 mt-4 w-1/2 text-lg leading-relaxed text-white">{t.bio}</p>

          <Image
            src="/profile.svg"
            alt=""
            width={600}
            height={400}
            priority
            unoptimized
            className="-mt-40 h-auto w-full max-w-3xl self-center"
          />
        </section>

        <section className="mt-16 sm:mt-24">
          <CareerTimeline items={career} />
        </section>
      </div>
    </div>
  )
}
