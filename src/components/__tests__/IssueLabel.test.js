import React from 'react'
import { render } from 'react-testing-library'
import IssueLabel from '../IssueLabel'

it('renders with black text on light backgrounds', () => {
  const { container } = render(<IssueLabel color="#eee" />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with white text on dark backgrounds', () => {
  const { container } = render(<IssueLabel color="#333" />)
  expect(container.firstChild).toMatchSnapshot()
})
