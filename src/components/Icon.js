import React from 'react'
import system from 'system-components/emotion'

const Icon = system(
  {
    is: 'svg',
    size: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    vectorEffect: 'non-scaling-stroke',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  {
    verticalAlign: 'middle',

    ' *': {
      vectorEffect: 'inherit',
    },
  },
  'space',
  'color',
)

Icon.displayName = 'Icon'

export function IssueIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </Icon>
  )
}

export function PullRequestIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </Icon>
  )
}

export function MergeIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </Icon>
  )
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  )
}

export function XIcon(props) {
  return (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />{' '}
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  )
}

export function SmallCircleIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="6" />
    </Icon>
  )
}

export function EllipsesIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </Icon>
  )
}

export function ChevronDownIcon(props) {
  return (
    <Icon {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  )
}

export function ArrowLeftIcon(props) {
  return (
    <Icon {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Icon>
  )
}

export default Icon
