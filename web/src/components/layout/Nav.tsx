import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { stripLocale, toLocalePath } from '../../lib/i18n'
import { LanguageSwitch } from './LanguageSwitch'
import './Nav.css'

interface NavProps {
  locale: Locale
}

/** A nav item is active on its own page and on anything beneath it. */
function isActive(current: string, href: string): boolean {
  if (href === '/') return current === '/'
  return current === href || current.startsWith(`${href}/`)
}

export function Nav({ locale }: NavProps) {
  const { nav } = getContent(locale)
  const { pathname } = useLocation()
  const current = stripLocale(pathname)

  const [open, setOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close on route change so the panel never survives navigation.
  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const links = nav.primary.map((item) => {
    const active = isActive(current, item.href)
    return (
      <Link
        key={item.href}
        data-testid="nav-link"
        className={`nav__link ${active ? 'is-active' : ''}`}
        to={toLocalePath(item.href, locale)}
        aria-current={active ? 'page' : undefined}
      >
        {item.label}
      </Link>
    )
  })

  return (
    <nav className="nav" aria-label={nav.brand}>
      <div className="nav__primary">{links}</div>

      <div className="nav__actions">
        <Link
          className="nav__search"
          to={toLocalePath('/contact', locale)}
          aria-label={nav.searchAriaLabel}
        >
          {nav.searchLabel}
        </Link>
        <Link className="nav__quote" to={toLocalePath(nav.quoteCta.href, locale)}>
          {nav.quoteCta.label}
        </Link>
        <LanguageSwitch />
      </div>

      <button
        ref={toggleRef}
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? nav.closeLabel : nav.menuLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav__toggle-bar" aria-hidden="true" />
        <span className="nav__toggle-bar" aria-hidden="true" />
      </button>

      {open && (
        <div id={panelId} className="nav__panel">
          <div className="nav__panel-links">{links}</div>
          <div className="nav__panel-actions">
            <Link className="nav__quote" to={toLocalePath(nav.quoteCta.href, locale)}>
              {nav.quoteCta.label}
            </Link>
            <LanguageSwitch />
          </div>
        </div>
      )}
    </nav>
  )
}
