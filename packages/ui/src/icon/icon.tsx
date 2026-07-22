import type { IconBaseProps, IconType } from 'react-icons'
import { FaArrowLeft, FaBriefcase, FaGithub, FaGraduationCap, FaLink, FaLinkedin, FaRegCalendar } from 'react-icons/fa6'

const iconRegistry = {
  arrowLeft: FaArrowLeft,
  briefcase: FaBriefcase,
  graduationCap: FaGraduationCap,
  calendar: FaRegCalendar,
  github: FaGithub,
  linkedin: FaLinkedin,
  link: FaLink,
} satisfies Record<string, IconType>

export type IconName = keyof typeof iconRegistry

export const iconNames = Object.keys(iconRegistry) as IconName[]

export interface IconProps extends IconBaseProps {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconRegistry[name]
  return <IconComponent {...props} />
}
