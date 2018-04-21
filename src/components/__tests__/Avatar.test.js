import React from 'react'
import renderer from 'react-test-renderer'
import Avatar from '../Avatar'

it('renders without crashing', () => {
  const tree = renderer
    .create(
      <Avatar src="http://via.placeholder.com/100x100" alt="placeholder" />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders with custom size (number)', () => {
  const tree = renderer
    .create(
      <Avatar
        src="http://via.placeholder.com/100x100"
        alt="placeholder"
        size={32}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders with custom size (string)', () => {
  const tree = renderer
    .create(
      <Avatar
        src="http://via.placeholder.com/100x100"
        alt="placeholder"
        size="4rem"
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
