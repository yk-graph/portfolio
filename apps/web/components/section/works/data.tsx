import { getWorks, type Work } from '@/lib/notion'

import { WorksError } from './error'
import { WorksGallery } from './gallery'

export async function WorksData() {
  let works: Work[]

  try {
    works = await getWorks()
  } catch {
    return <WorksError />
  }

  return <WorksGallery works={works} />
}
