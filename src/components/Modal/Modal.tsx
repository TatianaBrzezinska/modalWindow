import React, { useState } from "react";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import "./Modal.css";

interface ModalProps {
  onClose: VoidFunction;
}

export const Modal = ({ onClose }: ModalProps) => {
  const [isSending, setIsSending] = useState(false);

  const handleClose = () => {
    if (!isSending) {
      onClose();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      handleClose();
    }, 1000);
  };

  return (
    <ModalWrapper onClose={handleClose}>
      <div className="modal">
        <h2 className="modal__title">
          Do you want to receive news from{" "}
          <a className="modal__link" href="#" aria-label="TM Team">
            TM-team
          </a>
          ?
        </h2>
        <p className="modal__text">Leave your email and we'll contact you!</p>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            className="modal__input"
            placeholder="Type your email here"
          />
          <button type="submit" className="modal__button">
            {isSending ? <span className="modal__loading">c</span> : "Submit"}
          </button>
        </form>
        <button
          className="modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          x
        </button>
      </div>
    </ModalWrapper>
  );
};
