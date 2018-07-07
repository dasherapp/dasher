import React from 'react'
import { renderWithTheme } from '../../utils/testUtils'
import Avatar from '../Avatar'

it('renders without crashing', () => {
  const { container } = renderWithTheme(
    <Avatar src="http://via.placeholder.com/100x100" alt="placeholder" />,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with custom size (number)', () => {
  const { container } = renderWithTheme(
    <Avatar
      src="http://via.placeholder.com/100x100"
      alt="placeholder"
      size={32}
    />,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with custom size (string)', () => {
  const { container } = renderWithTheme(
    <Avatar
      src="http://via.placeholder.com/100x100"
      alt="placeholder"
      size="4rem"
    />,
  )
  expect(container.firstChild).toMatchSnapshot()
})
