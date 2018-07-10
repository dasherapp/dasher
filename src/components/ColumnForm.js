import { func, shape, string } from 'prop-types'
import React from 'react'
import Button from './Button'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'

function LabelText(props) {
  return (
    <Text
      is="span"
      display="inline-block"
      mb={2}
      fontSize={1}
      lineHeight="none"
      {...props}
    />
  )
}

function ColumnForm({ formState, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      <Box py={2} px={4}>
        <Box py={2}>
          <Flex is="label" flexDirection="column">
            <LabelText>Name</LabelText>
            <input
              value={formState.name}
              onChange={event => onChange({ name: event.target.value })}
              required
              autoFocus
            />
          </Flex>
        </Box>
        <Box py={2}>
          <Flex is="label" flexDirection="column">
            <LabelText>Query</LabelText>
            <input
              value={formState.query}
              onChange={event => onChange({ query: event.target.value })}
              required
            />
          </Flex>
        </Box>
      </Box>
      <Flex
        justifyContent="flex-end"
        px={4}
        py={3}
        borderTop="1px solid"
        borderColor="grayAlpha.2"
      >
        <Button type="button" buttonStyle="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Flex>
    </form>
  )
}

ColumnForm.propTypes = {
  formState: shape({
    name: string.isRequired,
    query: string.isRequired,
  }).isRequired,
  onChange: func,
  onSubmit: func,
  onCancel: func,
}

ColumnForm.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  onCancel: () => {},
}

export default ColumnForm
