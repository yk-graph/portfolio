import { type ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
}

const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-none border'

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
}

export function Badge({ children, variant = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span className={[baseClasses, variantClasses[variant], className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  )
}
