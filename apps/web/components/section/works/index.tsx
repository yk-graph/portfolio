import { WorksData } from './data'

export function WorksSection() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-col py-14 pl-6 pr-40 sm:pr-80 xl:pr-150">
        <h2 className="font-heading text-6xl font-black leading-none sm:text-7xl">Works</h2>
        <WorksData />
      </div>
    </div>
  )
}
