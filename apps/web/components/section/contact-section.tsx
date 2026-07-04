'use client'

export function ContactSection() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <h2 className="font-heading text-4xl font-black sm:text-5xl">Contact</h2>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <select
          aria-label="Subject"
          defaultValue=""
          className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white"
        >
          <option value="" disabled>
            Select a subject
          </option>
          <option value="job">Job opportunity</option>
          <option value="project">Project inquiry</option>
          <option value="hi">Just saying hi</option>
        </select>
        <input
          type="email"
          aria-label="Email"
          placeholder="you@example.com"
          className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50"
        />
        <textarea
          aria-label="Message"
          rows={3}
          placeholder="Write your message..."
          className="resize-none rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  )
}
