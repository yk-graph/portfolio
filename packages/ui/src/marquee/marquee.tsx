import { type CSSProperties, type ElementType, type ReactNode } from 'react'

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

const keyframes = `@keyframes repo-ui-marquee{to{transform:translateX(-50%)}}@media(prefers-reduced-motion:reduce){[data-repo-ui-marquee]{animation:none}}`

export interface MarqueeProps {
  children: ReactNode
  as?: ElementType
  breakpoint?: Breakpoint
  durationSec?: number
  gap?: string
  className?: string
}

export function Marquee({ children, as, breakpoint, durationSec = 50, gap = '0.3em', className }: MarqueeProps) {
  const Tag = as ?? 'div'
  const trackStyle: CSSProperties = { animation: `repo-ui-marquee ${durationSec}s linear infinite` }

  const track = (
    <span className={`${breakpoint ? MARQUEE_AT[breakpoint] : 'block'} w-full overflow-hidden`}>
      <span data-repo-ui-marquee className="flex w-max whitespace-nowrap" style={trackStyle}>
        <span style={{ paddingRight: gap }}>{children}</span>
        <span aria-hidden="true" style={{ paddingRight: gap }}>
          {children}
        </span>
      </span>
    </span>
  )

  return (
    <>
      <style>{keyframes}</style>
      <Tag className={className}>
        {breakpoint && <span className={STATIC_AT[breakpoint]}>{children}</span>}
        {track}
      </Tag>
    </>
  )
}
