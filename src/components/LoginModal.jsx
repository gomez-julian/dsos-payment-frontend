import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Host } from "../Host";
import { Fetch } from "../utilities/fetch";

export const LoginModal = (props) => {
    const {show, setShow, toast, setActive} = props
    const [body, setBody] = React.useState({
        usernameOrEmail: "",
        password: ""
    })

  React.useEffect(() => console.log("Renderizando LoginModal..."));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBody({ ...body, [name]: value });
  };

  const handleClose = () => setShow(false);
  const login = () => {
    console.log(body)
    Fetch(Host.auth.login, "POST", body)
    .then((r) => {
      if (r.status === 200) {
        console.log('Se ha autentificado')
        return r.json()
      }
      return {}
    }).then((j) => {
        if(JSON.stringify(j).includes("data")){
            toast("Sesión iniciada")
            handleClose()
            localStorage.setItem('jwt', j.data)
            localStorage.setItem('user', body.usernameOrEmail)
            setActive(true)
            console.log('Se ha guardado el jwt')
        }else{
            toast("Credenciales incorrectas")
            handleClose()
        }
    })
    .catch((e) => {
      console.log(e);
    });
  }

  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo o usuario</Form.Label>
        <Form.Control type="email" placeholder="Correo o usuario" 
        name="usernameOrEmail" value={body.usernameOrEmail} onChange={handleInputChange}/>
        <Form.Text className="text-muted">
          Se requiere iniciar para realizar la acción.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" 
        name="password" value={body.password} onChange={handleInputChange}/>
      </Form.Group>
      <Button variant="primary" type="button" onClick={login}>
        Acceder
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
