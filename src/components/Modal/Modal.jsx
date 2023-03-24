import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './Modal.styles';

export default function Modal({ image, closeModal }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={image} alt="big mode" />
      </ModalStyled>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
