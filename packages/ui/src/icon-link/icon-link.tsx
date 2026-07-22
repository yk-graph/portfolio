import { type ComponentPropsWithoutRef, type ElementType } from 'react'

import { Icon, type IconName } from '../icon'

export interface IconLinkProps extends ComponentPropsWithoutRef<'a'> {
  as?: ElementType
  icon: IconName
  iconSize?: number
}

export function IconLink({ as, icon, iconSize = 18, className, ...rest }: IconLinkProps) {
  const Tag = as ?? 'a'

  return (
    <Tag
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${className ?? ''}`}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
    </Tag>
  )
}
