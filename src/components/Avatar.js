import system from 'system-components/emotion'

const Avatar = system(
  {
    is: 'img',
    size: 24,
    borderRadius: 1,
  },
  {
    verticalAlign: 'middle',
  },
)

Avatar.displayName = 'Avatar'

export default Avatar
