import qs from 'qs'
import React, { Component } from 'react'
import { logIn } from '../utils/auth'

class CallbackPage extends Component {
  async componentDidMount() {
    const { code } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    })

    if (code) {
      await logIn(code)
      this.props.history.replace('/')
    }
  }

  render() {
    return <div>Loading...</div>
  }
}

export default CallbackPage
