import React from 'react'
import Text from './Text'

function Heading(props) {
  return (
    <Text
      m={0}
      fontWeight="bold"
      lineHeight="tight"
      color="grayAlpha.9"
      {...props}
    />
  )
}

export default Heading
