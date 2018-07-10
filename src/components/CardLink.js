import system from 'system-components/emotion'

const CardLink = system(
  {
    is: 'a',
    p: 4,
    bg: 'white',
    boxShadow: 1,
    borderRadius: 2,

    hover: {
      boxShadow: 2,
    },

    focus: {
      boxShadow: 2,
    },
  },
  {
    textDecoration: 'none',
    outline: 0,
  },
  'height',
)

CardLink.displayName = 'CardLink'

export default CardLink
