import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Products } from "./Products";
import { Host } from "./Host";
import { PaymentForm } from "./forms/PaymentForm";
import { NikeNav } from "./components/NikeNav";
import { Summary } from "./components/Summary";
import { Error404 } from "./components/Error404";
import { ToastMsg } from "./components/Toast";
import { LoginModal } from "./components/LoginModal";
import { PaymentCrud } from "./PaymentCrud";

const App = () => {
  //TODOS LOS ZAPATOS QUE COMPRAS
  const [products, setProducts] = React.useState([]);
  //EL CARRITO DE COMPRAS
  const [cart, setCart] = React.useState([]);
  //MOSTRAR LA NOTIFICACION
  const [show, setShow] = React.useState(false);
  //MOSTRAR LA VENTANA DE LOGIN
  const [showModal, setShowModal] = React.useState(false);
  //EL USUARIO ESTA LOGEADO
  const [active, setActive] = React.useState(false);
  //MENSAJE DE LA NOTIFICACION
  const [toastMsg, setToastMsg] = React.useState('Mensaje del Toast');

  React.useEffect(() => {
    //AL CREARSE EL COMPONENTE SE OBTIENEN LOS ZAPATOS
    fetch(Host.purchases)
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          return r.json();
        } else {
          return { data: [] };
        }
      })
      .then((j) => {
        let shoes = []
        //SE HACE PUSH A LOS ZAPATOS POR CADA UNO DE LOS ZAPATOS QUE SE OBTUVIERON
        j.data.map((e) => shoes.push({
          "idProducto": e.idProducto,
          "precioCompra": e.precioCompra,
          "precioVenta": e.precioVenta,
          "talla": e.talla,
          "stock": e.stock,
          "color": e.color, 
          "marca": e.marca.nombreMarca,
          "modelo": e.modelo.nombreModelo,     
          }))
        console.log(shoes);
        setProducts(shoes);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setProducts]);

  const activeToast = (msg) => {
    setToastMsg(msg)
    setShow(true)
  }

  return (
    //ROUTER ES TODA LA APLICACION
    //ROUTE ES CADA UNA DE LAS RUTAS QUE PUEDE (CADA PAGINA PUES XD)
    <><Router>
      <NikeNav cart={cart} setShow={setShowModal} active={active} setActive={setActive}/>
      <Routes>
        <Route exact path="/" element={<Products products={products} cart={cart} setCart={setCart} toast={activeToast}/>} />
        <Route exact path="/pay" element={<PaymentForm cart={cart} setCart={setCart} toast={activeToast}/>} />
        <Route exact path="/cart" element={<Summary cart={cart} setCart={setCart} />} />
        <Route exact path="/crud" element={<PaymentCrud toast={activeToast}/>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
    <ToastMsg show={show} setShow={setShow} toastMsg={toastMsg}/>
    <LoginModal show={showModal} setShow={setShowModal} toast={activeToast} setActive={setActive}/>
    </>
  );
};

export default App;
