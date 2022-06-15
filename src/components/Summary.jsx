import React from "react";
import "../styles/bootstrap.min.css";
import "../styles/Summary.css";
import { SummaryItem } from "./SummaryItem";
import { EmptyCart } from "./EmptyCart";

export const Summary = (props) => {
  const {cart, setCart} = props

  React.useEffect(() => console.log('Renderizando Summary...'))

  return (
    <section className=".section-summary m-5">
        <div className="row align-items-center">
        {cart.length > 0 ? (
            cart.map((data) => (
              <SummaryItem data={data} key={data.idProducto} cart={cart} setCart={setCart}/>
            ))
          ) : (
            <EmptyCart />
          )}
    </div>
</section>
  );
};
