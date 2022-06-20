import React from "react";
import "./styles/bootstrap.min.css";
import "./styles/ProductCard.css";
import { ProductCard } from "./components/ProductCard";
import { Error404 } from "./components/Error404";

export const Products = (props) => {
  
  const { products, cart, setCart, toast } = props;

  React.useEffect(() => console.log("Renderizando Products..." + typeof products));

  const isEmpty = () => {
    return typeof products === 'undefined' || products.length < 1
  }

  return (
    <section className="section-products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h2>Productos en Tendencia</h2>
            </div>
          </div>
        </div>
        <div className="row">
          { ! isEmpty()  ? (
            products.map((data) => (
              <ProductCard data={data} key={data.idProducto} cart={cart} setCart={setCart} toast={toast}/>
            ))
          ) : (
            <Error404 />
          )}
        </div>
      </div>
    </section>
  );
};
