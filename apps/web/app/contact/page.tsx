import type { Metadata } from 'next'

import { BackNavigation } from '../components/back-navigation'

export const metadata: Metadata = {
  title: 'Contact',
}

const subjects = ['Job opportunity', 'Project inquiry', 'Just saying hi']

export default function ContactPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-8">
      <BackNavigation />

      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6">
        <h1 className="font-heading text-3xl font-black sm:text-4xl">Contact</h1>

        <div className="space-y-4">
          <p className="w-fit rounded-2xl rounded-bl-sm bg-black/5 px-4 py-3 text-sm leading-relaxed text-text-primary">
            Hi! What would you like to talk about?
          </p>

          <form className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-semibold text-text-primary">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                defaultValue=""
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-text-primary"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-text-primary">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-text-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-semibold text-text-primary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message..."
                className="w-full resize-none rounded-2xl rounded-br-sm border border-black/15 bg-white px-4 py-3 text-sm text-text-primary"
              />
            </div>

            <p aria-live="polite" className="min-h-5 text-sm text-red-600" />

            <button
              type="button"
              className="w-full rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-text-inverse transition-opacity hover:opacity-90"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
