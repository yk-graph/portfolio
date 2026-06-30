import type { IconBaseProps, IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaRegCalendar } from 'react-icons/fa6'

const iconRegistry = {
  calendar: FaRegCalendar,
  github: FaGithub,
  linkedin: FaLinkedin,
} satisfies Record<string, IconType>

export type IconName = keyof typeof iconRegistry

export interface IconProps extends IconBaseProps {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconRegistry[name]
  return <IconComponent {...props} />
}
