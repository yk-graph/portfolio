export type SectionId = 'home' | 'works' | 'notes' | 'contact'

export const sections: {
  id: SectionId
  label: string
  bg: string
  gradient: string
}[] = [
  {
    id: 'home',
    label: 'Home',
    bg: 'var(--color-brand-navy)',
    gradient:
      'linear-gradient(315deg, var(--color-brand-navy), var(--color-brand-navy-dark), var(--color-brand-navy), var(--color-brand-navy-light), var(--color-brand-navy))',
  },
  {
    id: 'works',
    label: 'Works',
    bg: 'var(--color-brand-olive)',
    gradient:
      'linear-gradient(315deg, var(--color-brand-olive), var(--color-brand-olive-dark), var(--color-brand-olive), var(--color-brand-olive-light), var(--color-brand-olive))',
  },
  {
    id: 'notes',
    label: 'Notes',
    bg: 'var(--color-brand-forest)',
    gradient:
      'linear-gradient(315deg, var(--color-brand-forest), var(--color-brand-forest-dark), var(--color-brand-forest), var(--color-brand-forest-light), var(--color-brand-forest))',
  },
  {
    id: 'contact',
    label: 'Contact',
    bg: 'var(--color-brand-cherry)',
    gradient:
      'linear-gradient(315deg, var(--color-brand-cherry), var(--color-brand-cherry-dark), var(--color-brand-cherry), var(--color-brand-cherry-light), var(--color-brand-cherry))',
  },
]
