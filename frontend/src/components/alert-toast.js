import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function AlertToast({ personNome, mensagem }) {
  const [position, setPosition] = useState('top-end');

  return (
    <>
        <ToastContainer
          className="p-3"
          position={position}
          style={{ zIndex: 1 }}
        >
          <Toast>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{personNome}</strong>
            </Toast.Header>
            <Toast.Body>{mensagem}</Toast.Body>
          </Toast>
        </ToastContainer>
    </>
  );
}

export default AlertToast;