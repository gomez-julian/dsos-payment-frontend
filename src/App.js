import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Products } from "./Products";
import { Host } from "./Host";
import { PaymentForm } from "./forms/PaymentForm";
import { NikeNav } from "./components/NikeNav";
import { Summary } from "./components/Summary";
import { Error404 } from "./components/Error404";
import Crud from "./Crud";

const App = () => {
  const [products, setProducts] = React.useState();
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    fetch(Host.purchases)
      .then((r) => {
        if (r.status === 200) {
          return r.json();
        } else {
          return { data: [] };
        }
      })
      .then((j) => {
        console.log(j.data);
        setProducts(j.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setProducts]);

  return (
    <Router>
    <NikeNav cart={cart}/>
        <Routes>
          <Route exact path="/" element={<Products products={products} cart={cart} setCart={setCart}/>}/>
          <Route exact path="/pay" element={<PaymentForm cart={cart}/>}/>
          <Route exact path="/cart" element={<Summary cart={cart} setCart={setCart}/>}/>
          <Route exact path="/crud" element={<Crud />}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
    </Router>
  );
};

export default App;
