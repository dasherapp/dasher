import React from 'react'
import { renderIntoDocument, render, fireEvent } from 'react-testing-library'

import SkeletonButton from '../SkeletonButton'

it('renders without crashing', () => {
  const { container } = render(
    <SkeletonButton>Test SkeletonButton</SkeletonButton>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with custom number width', () => {
  const { container } = render(
    <SkeletonButton width={360}>Custom Width SkeletonButton</SkeletonButton>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('renders with custom percentage width', () => {
  const { container } = render(
    <SkeletonButton width={'100%'}>Custom Width SkeletonButton</SkeletonButton>,
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('calls onClick when button is clicked', () => {
  const handleClick = jest.fn()
  const { getByText } = renderIntoDocument(
    <SkeletonButton onClick={handleClick}>
      Clickable SkeletonButton
    </SkeletonButton>,
  )
  fireEvent(
    getByText('Clickable SkeletonButton'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  expect(handleClick).toHaveBeenCalledTimes(1)
})
