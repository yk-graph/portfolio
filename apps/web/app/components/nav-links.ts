export const navLinks = [
  { label: 'ABOUT', href: '/about' },
  { label: 'SKILL', href: '/skill' },
  { label: 'RESUME', href: '/resume' },
] as const

export type NavLink = (typeof navLinks)[number]
