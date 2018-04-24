import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class DragDrop extends Component {
  state = { items: [] }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    )

    this.setState({
      items,
    })
  }

  render() {
    return <DragDropContext onDragEnd={this.onDragEnd} {...this.props} />
  }
}

export default DragDrop
