import { mq } from '../style'

describe('mq()', () => {
  it('uses em units by default', () => {
    expect(mq(32)).toMatchSnapshot()
  })

  it('works with px units', () => {
    expect(mq('1200px')).toMatchSnapshot()
  })
})
