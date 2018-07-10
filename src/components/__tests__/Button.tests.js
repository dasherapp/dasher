import React from 'react'
import { fireEvent, renderIntoDocument } from 'react-testing-library'
import { renderWithTheme } from '../../utils/testUtils'
import Button from '../Button'
import { EllipsesIcon } from '../Icon'

it('renders without crashing', () => {
  const { container } = renderWithTheme(<Button>Test Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders when disabled', () => {
  const { container } = renderWithTheme(
    <Button disabled>Disabled Button</Button>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as primary', () => {
  const { container } = renderWithTheme(
    <Button buttonStyle="primary">Primary Button</Button>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as secondary', () => {
  const { container } = renderWithTheme(
    <Button buttonStyle="secondary">Primary Button</Button>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as danger', () => {
  const { container } = renderWithTheme(
    <Button buttonStyle="danger">Primary Button</Button>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders as icon', () => {
  const { container } = renderWithTheme(
    <Button buttonStyle="icon">
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
