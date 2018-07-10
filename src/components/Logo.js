import React from 'react'
import system from 'system-components/emotion'

const Svg = system(
  {
    is: 'svg',
    size: 24,
    color: 'indigo.7',
  },
  { verticalAlign: 'middle' },
  'space',
  'color',
)

Svg.displayName = 'Svg'

function Logo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      fill="currentColor"
      {...props}
    >
      <path d="M16.013 0C8.579 0 3.744 7.823 7.069 14.472l8.291 16.584a20 20 0 0 1 0 17.888L7.07 65.528C3.744 72.177 8.579 80 16.013 80h23.82c22.09 0 40-17.909 40-40s-17.91-40-40-40h-23.82z" />
    </Svg>
  )
}

export default Logo
