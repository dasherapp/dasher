import system from 'system-components/emotion'

const Link = system(
  {
    is: 'a',

    hover: {
      color: 'indigo.8',
    },
  },
  {
    textDecoration: 'none',
  },
)

Link.displayName = 'Link'

export default Link
