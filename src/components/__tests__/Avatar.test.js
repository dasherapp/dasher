import React from 'react'
import { render } from 'react-testing-library'
import Avatar from '../Avatar'

it('renders without crashing', () => {
  const { container } = render(
    <Avatar src="http://via.placeholder.com/100x100" alt="placeholder" />,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with custom size (number)', () => {
  const { container } = render(
    <Avatar
      src="http://via.placeholder.com/100x100"
      alt="placeholder"
      size={32}
    />,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with custom size (string)', () => {
  const { container } = render(
    <Avatar
      src="http://via.placeholder.com/100x100"
      alt="placeholder"
      size="4rem"
    />,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as circle', () => {
  const { container } = render(
    <Avatar
      src="http://via.placeholder.com/100x100"
      alt="placeholder"
      size="4rem"
      shape="circle"
    />,
  )
  expect(container.firstChild).toMatchSnapshot()
})
