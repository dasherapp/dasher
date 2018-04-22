import React from 'react'
import renderer from 'react-test-renderer'
import Icon, {
  IssueIcon,
  PullRequestIcon,
  MergeIcon,
  CheckIcon,
  XIcon,
  CircleIcon,
  EllipsesIcon,
} from '../Icon'

it('renders without crashing', () => {
  const tree = renderer
    .create(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders with custom color and size', () => {
  const tree = renderer
    .create(
      <Icon color="#C27E00" size={16}>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders custom icons', () => {
  const tree = renderer
    .create(
      <div>
        <IssueIcon />
        <PullRequestIcon />
        <MergeIcon />
        <CheckIcon />
        <XIcon />
        <CircleIcon />
        <EllipsesIcon />
      </div>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
