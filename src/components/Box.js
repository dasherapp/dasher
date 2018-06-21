import system from 'system-components/emotion'

const Box = system(
  // Core
  'space',
  'width',
  'fontSize',
  'color',

  // Layout
  'display',
  'height',

  // Flexbox
  'alignItems',
  'justifyContent',
  'flexWrap',
  'flexDirection',
  'flex',
  'alignContent',
  'justifySelf',
  'alignSelf',
  'order',
  'flexBasis',

  // Misc
  'borders',
  'borderColor',
  'borderRadius',
  'boxShadow',
)

Box.displayName = 'Box'

export default Box
