export function HomeSection() {
  return (
    <div className="flex h-full w-full max-w-5xl flex-col py-12">
      <div className="flex flex-1 flex-col justify-center gap-6">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-white/70">Portfolio</p>
        <h1 className="font-heading text-4xl font-black leading-tight sm:text-6xl">
          I&apos;m a<br />
          Software Developer
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/80">
          Building web products with a focus on clear UI and maintainable front-end architecture.
        </p>
      </div>
    </div>
  )
}
