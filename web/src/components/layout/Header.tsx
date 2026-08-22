import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { toLocalePath } from '../../lib/i18n'
import { Container } from '../primitives'
import { Nav } from './Nav'
import './Header.css'

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const { nav } = getContent(locale)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${compact ? 'header--compact' : ''}`}>
      <Container width="wide">
        <div className="header__inner">
          <Link className="header__brand" to={toLocalePath('/', locale)}>
            {nav.brand}
          </Link>
          <Nav locale={locale} />
        </div>
      </Container>
    </header>
  )
}
