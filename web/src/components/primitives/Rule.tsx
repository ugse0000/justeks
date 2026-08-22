import './Rule.css'

interface RuleProps {
  tone?: 'default' | 'gold' | 'dark'
  className?: string
}

/** A 1px horizontal rule used to separate blocks without a heavy border. */
export function Rule({ tone = 'default', className = '' }: RuleProps) {
  return <hr className={`rule rule--${tone} ${className}`} />
}
