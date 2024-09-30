"use client"
import { useState } from "react";
import Modal from "react-modal";
import "./style.css";

export default function CV() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <a
        href="#"
        onClick={openModal}
        className="md:p-4 text-foreground hover:text-primary"
      >
        CV
      </a>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="CV Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="close-btn">Close</button>
        <iframe
          src="/cv.pdf"
          className="w-full h-screen"
          style={{ border: "none" }}
        />
      </Modal>
    </>
  );
}
