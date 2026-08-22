import type { ReactNode } from 'react'
import './Container.css'

interface ContainerProps {
  children: ReactNode
  /** "wide" opens up to the full page width for maps and image bands. */
  width?: 'content' | 'wide'
  className?: string
}

export function Container({ children, width = 'content', className = '' }: ContainerProps) {
  return <div className={`container container--${width} ${className}`}>{children}</div>
}
