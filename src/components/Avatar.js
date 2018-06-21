import system from 'system-components/emotion'

const Avatar = system(
  {
    is: 'img',
    borderRadius: 2,
  },
  {
    verticalAlign: 'middle',
  },
  'size',
)

Avatar.displayName = 'Avatar'

export default Avatar
