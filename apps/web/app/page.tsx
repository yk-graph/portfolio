import { Navigation } from './components/navigation'

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col rounded-3xl bg-dark-navy px-6 py-12 text-text-inverse">
      <div className="flex flex-1 flex-col justify-center gap-6">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-text-inverse/70">Portfolio</p>
        <h1 className="font-heading text-4xl font-black leading-tight sm:text-6xl">
          I&apos;m a<br />Software Developer
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-text-inverse/80">
          Building web products with a focus on clear UI and maintainable front-end architecture. Selected work,
          writing, and background are below.
        </p>
      </div>

      <Navigation />
    </section>
  )
}
