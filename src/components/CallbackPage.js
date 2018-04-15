import { Component } from 'react'
import qs from 'qs'

import { logIn } from '../utils/auth'

class CallbackPage extends Component {
  async componentDidMount() {
    const { code } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    })

    if (code) {
      logIn(code)
      this.props.history.replace('/')
    }
  }

  render() {
    return null
  }
}

export default CallbackPage
