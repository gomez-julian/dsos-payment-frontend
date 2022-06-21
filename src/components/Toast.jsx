import React from "react";
import "../styles/bootstrap.min.css";
import { Row, Col, Toast, ToastContainer } from "react-bootstrap";


export const ToastMsg = (props) => {
  const {show, setShow, toastMsg} = props

  React.useEffect(() => console.log('Renderizando Toast...'))

  return (
    <Row>
      <Col xs={6}>
      <ToastContainer className="p-3" position={'top-end'}>
        <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Nike ITO</strong>
            <small>Justo ahora</small>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};
