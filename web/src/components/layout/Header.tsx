import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { toLocalePath } from '../../lib/i18n'
import { Logo } from '../brand'
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
          {/* The link carries the accessible name so it stays correct whichever
              mark the viewport is showing; both marks are decorative. */}
          <Link
            className="header__brand"
            to={toLocalePath('/', locale)}
            aria-label={nav.brand}
          >
            <Logo variant="lockup" className="header__logo header__logo--full" />
            <Logo variant="monogram" className="header__logo header__logo--compact" />
          </Link>
          <Nav locale={locale} />
        </div>
      </Container>
    </header>
  )
}
