import React from "react";
import "../styles/bootstrap.min.css";
import "../styles/PaymentItem.css";

export const PaymentItem = (props) => {
  const { data, editRow, deletePayment, confirmPayment, cancelPayment } = props;

  React.useEffect(() => console.log('Renderizando PaymentItem'));

  return (
    <div className="col-sm-12 col-lg-12 my-2">
      {data ? (
        <details>
        <summary>
          <div>
            <span>
              <img
                src="https://i.pinimg.com/originals/6f/4b/57/6f4b57d89d539fbdf11a8c5ae0402c30.png"
                alt="Nike shoe"
                width="192"
                height="192"
              />
            </span>
            <p>
              <strong>Pago #{data.paymentID} - ${data.paymentAmount}</strong>
              <small>Clic para ver los detalles</small>
            </p>
            <span>Status: {data.paymentStatus}</span>
          </div>
        </summary>
        <div>
          <dl>
            <div>
              <dt>Id de venta</dt>
              <dd>{data.saleID}</dd>
            </div>

            <div>
              <dt>Referencia</dt>
              <dd>{data.referenceID}</dd>
            </div>

            <div>
              <dt>Fecha</dt>
              <dd>{data.paymentDate}</dd>
            </div>

            <div>
              <dt>Fecha completada</dt>
              <dd>{data.positivePaymentDate}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt>Método de pago</dt>
              <dd>{data.paymentMethod}</dd>
            </div>

            <div>
              <dt>UUID</dt>
              <dd>{data.uuid}</dd>
            </div>

            <div>
              <dt>Fecha</dt>
              <dd>{data.paymentDate}</dd>
            </div>

            <div>
              <dt>Fecha completada</dt>
              <dd>{data.positivePaymentDate}</dd>
            </div>
          </dl>
          <dl>
          <div>
          <button className="btn btn-primary mx-2 my-1"
          onClick={() => editRow(data)}>Editar</button>
              <button className="btn btn-success mx-2 my-1"
              onClick={() => confirmPayment(data.paymentID)}>Confirmar</button>
              <button className="btn btn-warning mx-2 my-1"
              onClick={() => cancelPayment(data.paymentID)}>Cancelar</button>
              <button className="btn btn-danger mx-2 my-1"
              onClick={() => deletePayment(data.paymentID)}>Eliminar</button>
            </div>
          </dl>
        </div>
      </details>
      ):(<p></p>)}
    </div>
  );
};
