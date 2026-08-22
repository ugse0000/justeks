import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
  document.head.querySelectorAll('title, meta, link[rel="canonical"], link[rel="alternate"], script[type="application/ld+json"]')
    .forEach((el) => el.remove())
})
