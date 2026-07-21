import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'

export interface SlideLinkProps extends ComponentPropsWithoutRef<'a'> {
  as?: ElementType
  children: ReactNode
}

export function SlideLink({ as, className, children, ...rest }: SlideLinkProps) {
  const Tag = as ?? 'a'

  return (
    <Tag
      className={`block rounded-r-full py-3 pl-8 text-sm font-bold tracking-widest transition-[width] duration-300 ease-out sm:text-base ${className ?? ''}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
