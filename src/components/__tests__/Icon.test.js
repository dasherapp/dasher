import React from 'react'
import { render } from 'react-testing-library'

import Icon, {
  IssueIcon,
  PullRequestIcon,
  MergeIcon,
  CheckIcon,
  XIcon,
  SmallCircleIcon,
  EllipsesIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
} from '../Icon'

it('renders without crashing', () => {
  const { container } = render(
    <Icon>
      <circle cx="12" cy="12" r="10" />
    </Icon>,
  )

  expect(container.firstChild).toMatchSnapshot()
})

it('renders with custom color and size', () => {
  const { container } = render(
    <Icon color="#c27e00" size={16}>
      <circle cx="12" cy="12" r="10" />
    </Icon>,
  )

  expect(container.firstChild).toMatchSnapshot()
})

it('renders custom icons', () => {
  const { container } = render(
    <div>
      <IssueIcon />
      <PullRequestIcon />
      <MergeIcon />
      <CheckIcon />
      <XIcon />
      <SmallCircleIcon />
      <EllipsesIcon />
      <ChevronDownIcon />
      <ArrowLeftIcon />
    </div>,
  )

  expect(container.firstChild).toMatchSnapshot()
})
