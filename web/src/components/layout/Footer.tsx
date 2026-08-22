import { Link } from 'react-router'
import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { toLocalePath } from '../../lib/i18n'
import { Container } from '../primitives'
import './Footer.css'

interface FooterProps {
  locale: Locale
}

/** Prefix an internal href, preserving any query string. */
function localise(href: string, locale: Locale): string {
  const [path, query] = href.split('?')
  const localised = toLocalePath(path, locale)
  return query ? `${localised}?${query}` : localised
}

export function Footer({ locale }: FooterProps) {
  const { footer } = getContent(locale)

  return (
    <footer className="footer on-dark">
      <Container width="wide">
        <div className="footer__brand">
          <span className="footer__wordmark">{footer.brand}</span>
          <span className="footer__tagline t-h3">{footer.tagline}</span>
          <span className="footer__since t-small">{footer.since}</span>
        </div>

        <div className="footer__grid">
          {footer.columns.map((column) => (
            <nav key={column.heading} className="footer__col" aria-label={column.heading}>
              <h2 className="footer__heading t-eyebrow" data-testid="footer-heading">
                {column.heading}
              </h2>
              <ul role="list" className="footer__links">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link className="footer__link" to={localise(link.href, locale)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col footer__col--regions">
            <h2 className="footer__heading t-eyebrow" data-testid="footer-heading">
              {footer.regionsHeading}
            </h2>
            <p className="footer__regions t-small" data-testid="footer-regions">
              {footer.regions.join(' • ')}
            </p>
          </div>
        </div>

        <div className="footer__base">
          <p className="footer__copyright t-small" data-testid="footer-copyright">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <ul role="list" className="footer__legal">
            {footer.legal.map((link) => (
              <li key={link.href}>
                <Link className="footer__link" to={localise(link.href, locale)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
