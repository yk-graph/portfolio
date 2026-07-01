export type SectionId = 'home' | 'works' | 'notes' | 'contact'

export const sections: { id: SectionId; label: string; bg: string }[] = [
  { id: 'home', label: 'Home', bg: 'var(--color-brand-navy)' },
  { id: 'works', label: 'Works', bg: 'var(--color-brand-amber)' },
  { id: 'notes', label: 'Notes', bg: 'var(--color-brand-forest)' },
  { id: 'contact', label: 'Contact', bg: 'var(--color-brand-olive)' },
]
