import React from 'react'

const Modal = ({ handleClose, show }) => {

  return(
    <main className={show ? 'modal display-block' : 'modal display-none'}>
      <div className="modal-main">
        <p>Choose the genre you think you know best from the list of categories. A snippet of a song from that genre will start playing - use your musical wits to tell us who sang it. Remember you only have 30 seconds!</p>
        <button
          className="close-modal"
          onClick={handleClose}>
          Got it
        </button>
      </div>
    </main>
  )
}

export default Modal
