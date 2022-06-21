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
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('Mensaje del Toast');

  React.useEffect(() => {
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
