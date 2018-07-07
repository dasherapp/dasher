// Named this file `testUtils.js` instead of `test.js` because Jest treats
// `test.js`as a test file
// Source: https://jestjs.io/docs/en/configuration#testmatch-array-string

import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import { render } from 'react-testing-library'
import theme from '../theme'

export const renderWithTheme = children =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
