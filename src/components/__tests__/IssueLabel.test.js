import React from 'react'
import { renderWithTheme } from '../../utils/testUtils'
import IssueLabel from '../IssueLabel'

it('renders with black text on light backgrounds', () => {
  const { container } = renderWithTheme(<IssueLabel color="#eee" />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with white text on dark backgrounds', () => {
  const { container } = renderWithTheme(<IssueLabel color="#333" />)
  expect(container.firstChild).toMatchSnapshot()
})
