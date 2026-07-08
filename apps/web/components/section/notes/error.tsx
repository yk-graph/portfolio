export function NotesError() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-2">
      <p className="text-lg font-bold">Couldn&apos;t load notes.</p>
      <p className="text-sm text-white/70">Please try again later.</p>
    </div>
  )
}
