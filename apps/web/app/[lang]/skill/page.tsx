import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BackNavigation } from '@/components/common'
import { ContributionCalendar, LanguageList } from '@/components/skill'
import { getGithubSkill } from '@/lib/github'
import { hasLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/i18n/dictionaries'

export const metadata: Metadata = {
  title: 'Skill',
}

export const revalidate = 3600

export default async function SkillPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const t = (await getDictionary(lang)).skill
  const { calendar, languages, profileUrl } = await getGithubSkill()

  return (
    <div className="min-h-dvh overflow-hidden text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-6 sm:px-10">
        <header className="relative z-20">
          <BackNavigation />
        </header>

        <section className="flex flex-col gap-2">
          <h1 className="relative z-10 mt-10 sm:mt-20 font-heading text-[clamp(3rem,10vw,5rem)] font-black leading-[1.1]">
            Skill from Github
          </h1>

          <p className="text-lg leading-relaxed text-white/80">{t.description}</p>
        </section>

        <section className="my-4 sm:my-8">
          <ContributionCalendar calendar={calendar} contributionsLabel={t.contributions} profileUrl={profileUrl} />
        </section>

        <section className="my-4 flex flex-col gap-4 sm:my-8">
          <h2 className="font-heading text-2xl font-black">{t.languages}</h2>
          <LanguageList languages={languages} />
        </section>
      </div>
    </div>
  )
}
