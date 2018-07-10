import system from 'system-components/emotion'

const Avatar = system(
  {
    is: 'img',
    size: 24,
    borderRadius: 2,
  },
  {
    verticalAlign: 'middle',
  },
  'space',
)

Avatar.displayName = 'Avatar'

export default Avatar
