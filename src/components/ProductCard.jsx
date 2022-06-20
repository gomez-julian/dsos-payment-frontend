import React from "react";
import "../styles/bootstrap.min.css";
import "../styles/ProductCard.css";

export const ProductCard = (props) => {
  const {data, cart, setCart, toast} = props

  React.useEffect(() => console.log('Renderizando ProductCard...'))

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div id="product-1" className="single-product">
        <div className="part-1">
          <ul>
            <li>
              <i
                className="fas fa-shopping-cart"
                onClick={() => {
                  console.log('Agregando a carrito')
                  setCart([...cart, data])
                  toast('Se agregó ' + data.marca + ' ' + data.modelo)
                }}
              ></i>
            </li>
            <li>
              <i className="fas fa-heart"></i>
            </li>
            <li>
              <i className="fas fa-plus"></i>
            </li>
            <li>
              <i className="fas fa-expand"></i>
            </li>
          </ul>
        </div>
        <div className="part-2">
          <h3 className="product-title"><span>{data.marca}</span>-<span>{data.modelo}</span></h3>
          <h4 className="product-old-price">Talla {data.talla} </h4>
          <h4 className="product-price">${data.precioVenta}</h4>
        </div>
      </div>
    </div>
  );
};
