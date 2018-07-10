import openColor from 'open-color'
import { toAlpha } from './utils/style'

export const breakpoints = ['40em', '52em', '64em']

export const space = [0, 4, 8, 12, 16, 24, 32, 64, 128, 256, 512]

export const fonts = {
  sans: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Roboto"',
    '"Oxygen"',
    '"Ubuntu"',
    '"Cantarell"',
    '"Fira Sans"',
    '"Droid Sans"',
    '"Helvetica Neue"',
    'sans-serif',
  ].join(', '),
}

export const fontWeights = {
  normal: 400,
  bold: 600,
}

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64]

export const lineHeights = {
  none: 1,
  tight: 1.25,
  normal: 1.5,
  loose: 2,
}

export const colors = {
  ...openColor,
  grayAlpha: openColor.gray.map(color => toAlpha(color)),
}

export const radii = [0, 2, 4]

export const shadows = [
  `0 0 0 1px ${colors.grayAlpha[3]}`,
  `0 1px 1px 1px ${colors.grayAlpha[3]}`,
  `0 4px 8px 0 ${colors.grayAlpha[3]}, 0 2px 4px 1px ${colors.grayAlpha[2]}`,
  `0 15px 30px 0 ${colors.grayAlpha[3]}, 0 5px 15px 1px ${colors.grayAlpha[2]}`,
]

export const timingFunctions = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
}

export const durations = ['0', '100ms', '200ms']

export const focusStyle = {
  boxShadow: `0 0 0 2px ${colors.white}, 0 1px 2px 4px ${colors.grayAlpha[4]}`,
}

export default {
  breakpoints,
  space,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  colors,
  radii,
  shadows,
  timingFunctions,
  durations,
  focusStyle,
}
