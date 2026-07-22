import { type ElementType, type ReactNode } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const STATIC_AT: Record<Breakpoint, string> = {
  sm: 'block sm:hidden',
  md: 'block md:hidden',
  lg: 'block lg:hidden',
  xl: 'block xl:hidden',
  '2xl': 'block 2xl:hidden',
}

const MARQUEE_AT: Record<Breakpoint, string> = {
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  lg: 'hidden lg:block',
  xl: 'hidden xl:block',
  '2xl': 'hidden 2xl:block',
}

export interface MarqueeProps {
  children: ReactNode
  as?: ElementType
  breakpoint?: Breakpoint
  className?: string
}

export function Marquee({ children, as, breakpoint, className }: MarqueeProps) {
  const Tag = as ?? 'div'

  const track = (
    <span className={`${breakpoint ? MARQUEE_AT[breakpoint] : 'block'} w-full overflow-hidden`}>
      <span className="flex w-max whitespace-nowrap animate-marquee">
        <span className="pr-[0.3em]">{children}</span>
        <span aria-hidden="true" className="pr-[0.3em]">
          {children}
        </span>
      </span>
    </span>
  )

  return (
    <Tag className={className}>
      {breakpoint && <span className={STATIC_AT[breakpoint]}>{children}</span>}
      {track}
    </Tag>
  )
}
