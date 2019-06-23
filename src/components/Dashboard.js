import React from 'react'
import Modal from './Modal'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = { show: null }

    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal() {
    this.setState({ show: true })
  }

  hideModal() {
    this.setState({ show: false })
  }

  render() {
    return(
      <main>
        <button
          className="open-modal"
          type="button"
          onClick={this.showModal}>
          How to play
        </button>
        {this.state.show &&
          <Modal
            show={this.state.show}
            handleClose={this.hideModal}>
          </Modal>
        }
      </main>
    )
  }
}

export default Dashboard
