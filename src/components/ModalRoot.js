import React from 'react'
import { Subscribe } from 'unstated'

import ModalContainer from '../containers/ModalContainer'

const ModalRoot = () => (
  <Subscribe to={[ModalContainer]}>
    {modal => {
      const { component: Component, props } = modal.state

      return Component && <Component hideModal={modal.hideModal} {...props} />
    }}
  </Subscribe>
)

export default ModalRoot
