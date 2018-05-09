import React from 'react'
import { Svg } from 'glamorous'

import { colors } from '../theme'

function Logo({ size, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="currentColor"
      verticalAlign="middle"
      {...props}
    >
      <path
        d="M 10.0129 0C 2.57908 0 -2.25588 7.82312 1.06863 14.4721L 9.36042 31.0557C 12.1757 36.6863 12.1757 43.3137 9.36042 48.9443L 1.06863 65.5279C -2.25588 72.1769 2.57908 80 10.0129 80L 33.8326 80C 55.9239 80 73.8326 62.0914 73.8326 40C 73.8326 17.9086 55.9239 0 33.8326 0L 10.0129 0Z"
        transform="translate(6 0)"
      />
    </Svg>
  )
}

Logo.defaultProps = {
  size: 24,
  color: colors.indigo[7],
}

export default Logo
