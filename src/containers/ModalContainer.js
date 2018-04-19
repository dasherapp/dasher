import { Container } from 'unstated'

const INITIAL_STATE = {
  component: null,
  props: {},
}

class ModalContainer extends Container {
  state = INITIAL_STATE

  openModal = (component, props = {}) => this.setState({ component, props })

  closeModal = () => this.setState(INITIAL_STATE)
}

export default ModalContainer
