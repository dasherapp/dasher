import openColor from 'open-color'

import { toMediaQuery } from './utils/style'

export const breakpoints = {
  sm: toMediaQuery(32),
  md: toMediaQuery(48),
  lg: toMediaQuery(64),
  xl: toMediaQuery(80),
}

export const spacing = [4, 8, 12, 16, 24, 32, 64, 128, 256, 512]

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

export const radii = [3, 6]
