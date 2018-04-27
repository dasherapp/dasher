import React from 'react'
import { renderIntoDocument, render, fireEvent } from 'react-testing-library'

import Button from '../Button'
import { EllipsesIcon } from '../Icon'

it('renders without crashing', () => {
  const { container } = render(<Button>Test Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders when disabled', () => {
  const { container } = render(<Button disabled>Disabled Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as primary', () => {
  const { container } = render(<Button kind="primary">Primary Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as secondary', () => {
  const { container } = render(<Button kind="secondary">Primary Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as danger', () => {
  const { container } = render(<Button kind="danger">Primary Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as icon', () => {
  const { container } = render(
    <Button kind="icon">
      <EllipsesIcon />
    </Button>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('calls onClick when button is clicked', () => {
  const handleClick = jest.fn()
  const { getByText } = renderIntoDocument(
    <Button onClick={handleClick}>Clickable Button</Button>,
  )
  fireEvent(
    getByText('Clickable Button'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  expect(handleClick).toHaveBeenCalledTimes(1)
})
