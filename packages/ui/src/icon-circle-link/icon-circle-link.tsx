import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'

export interface IconCircleLinkProps extends ComponentPropsWithoutRef<'a'> {
  as?: ElementType
  children: ReactNode
}

export function IconCircleLink({ as, className, children, ...rest }: IconCircleLinkProps) {
  const Tag = as ?? 'a'

  return (
    <Tag
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${className ?? ''}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
