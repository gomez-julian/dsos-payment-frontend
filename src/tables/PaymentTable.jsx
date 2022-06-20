import React from "react";
import "../styles/bootstrap.min.css";

export const PaymentTable = (props) => {
  const {data, cart, setCart} = props

  React.useEffect(() => console.log('Renderizando SummaryItem...'))

  const deleteItem = () =>{
	setCart(cart.filter(d => d.idProducto !== data.idProducto))
  }

  return (
    <div className="col-sm-10 col-lg-7 my-2">
        <details>
		<summary>
			<div>
				<span>
                    <img src="https://i.ibb.co/L8Nrb7p/1.jpg" alt="Nike shoe" width="192" height="192"/>
					
				</span>
				<p>
					<strong>{data.marca}-{data.modelo}</strong>
					<small>Clic para ver los detalles</small>
				</p>
				<span>Subtotal: ${data.precioVenta}</span>
			</div>
		</summary>
		<div>
			<dl>
				<div>
					<dt>Color</dt>
					<dd>{data.color}</dd>
				</div>

				<div>
					<dt>Disponibles</dt>
					<dd>{data.stock}</dd>
				</div>

				<div>
					<dt>Talla</dt>
					<dd>{data.talla}</dd>
				</div>

                <div>
					<button className="btn btn-danger" onClick={deleteItem}>Eliminar</button>
				</div>
			</dl>
		</div>
	</details>
    </div>
  );
};
