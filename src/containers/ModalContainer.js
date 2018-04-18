import { Container } from 'unstated'

const INITIAL_STATE = {
  component: null,
  props: {},
}

class ModalContainer extends Container {
  state = INITIAL_STATE

  showModal = (component, props = {}) => this.setState({ component, props })

  hideModal = () => this.setState(INITIAL_STATE)
}

export default ModalContainer
