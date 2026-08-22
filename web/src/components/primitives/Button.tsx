import type { ReactNode } from 'react'
import { Link } from 'react-router'
import './Button.css'

type Variant = 'solid' | 'outline' | 'ghost'

interface CommonProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

interface LinkButtonProps extends CommonProps {
  href: string
  onClick?: never
  type?: never
  disabled?: never
}

interface ActionButtonProps extends CommonProps {
  href?: never
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export type ButtonProps = LinkButtonProps | ActionButtonProps

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href)

/**
 * Renders an <a> when given href, a <button> otherwise, so a link is never
 * faked with a click handler (and keyboard/middle-click keep working).
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'solid', className = '' } = props
  const cls = `button button--${variant} ${className}`.trim()

  if ('href' in props && props.href) {
    const { href } = props
    return isExternal(href)
      ? <a className={cls} href={href}>{children}</a>
      : <Link className={cls} to={href}>{children}</Link>
  }

  const { onClick, type = 'button', disabled } = props as ActionButtonProps
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
