// The primary section links, shared by the top-page Navigation and the
// sub-page BackNavigation so both stay in sync.
export const navLinks = [
  { label: 'ABOUT', href: '/about' },
  { label: 'SKILL', href: '/skill' },
  { label: 'RESUME', href: '/resume' },
] as const

export type NavLink = (typeof navLinks)[number]
