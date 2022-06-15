import React from "react";
import { Host } from "../Host";
import "../styles/bootstrap.min.css";
import "../styles/PaymentForm.css";
import { Fetch } from "../utilities/fetch";

export const PaymentForm = (props) => {
  const { cart } = props;
  const [cash, setCash] = React.useState(false);
  const [method, setMethod] = React.useState({
    paymentMethod: "Efectivo",
  });
  const [subtotal, setSubtotal] = React.useState(0);
  const [status, setStatus] = React.useState('Pagando...');

  React.useEffect(() => {
    console.log("Renderizando PaymentForm...")
    let total = 0;
    cart.map((e) => {total += e.precioVenta})
    setSubtotal(total)
  },[setSubtotal]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMethod({ ...method, [name]: value });
  };

  const postSale = (reference, total) => {
    const body = {
      folio: reference,
      costoTotal: total,
      cantidadPagada: total,
      cambio: 0.1,
      fecha: "",
      observaciones: "Creada por Judie",
      estado: "Aprobado",
      estatusDelete: false,
      idCliente: 0,
      idFactura: 0,
    };

    Fetch(Host.sales, 'POST', body).then((r) => {
      console.log('Status POST sales: ' + r.status)
      if (r.status === 200) {
        postPayment(reference, total);
      } else {
        setStatus('No se ha podido hacer la venta')
      }
    }).catch((e) => {
      console.log(e);
    });
    
  }

  const postPayment = (reference, total) => {
    const body = {
      ...method,
      referenceID: reference,
      paymentAmount: total
    }
    if(cash){
      body.paymentMethod = "Efectivo"
    }
    console.log(body)
    Fetch(Host.payment + 'pay', 'POST', body).then((r) => {
      console.log('Status POST payment: ' + r.status)
      if (r.status === 201) {
        setStatus('La venta se completó exitosamente')
      } else {
        setStatus('No se pudo realizar el pago')
        console.log(r.json())
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  const pay = () => {
    let total = 0;
    cart.map((e) => {total += e.precioVenta})
    const reference = 'J' + Date.now().toString().substring(6,12)

    postSale(reference, total);
    
    // const statusSale = 
    // if(statusSale){
    // const statusPayment =  
    // if(statusPayment){
    //   setStatus('Se ha completado la venta exitosamente')
    // }else{
    //   setStatus('Ha fallado el pago')
    // }
    // }else{
    //   setStatus('No se ha podido vender los productos')
    // }
    
    
  };

  return (
    <><div className="container d-flex justify-content-center mt-5 mb-5">
      <div className="row g-3">
        <div className="col-md-6">
          <span>Método de pago</span>
          <div className="card">
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header p-0" id="headingTwo">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-light btn-block text-left collapsed p-3 rounded-0 border-bottom-custom"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <span onClick={() => setCash(true)}>Efectivo</span>
                        <img
                          src="https://i.imgur.com/7kQEsHU.png"
                          width="30"
                          alt="img" />
                      </div>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body payment-card-body">
                    {/* <input
      type="text"
      className="form-control"
      placeholder="Referencia"
      name="referenceID"
      value={method.referenceID}
      onChange={handleInputChange}
      autoComplete="off"
    /> */}
                    <p>La venta se cobrará en efectivo</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header p-0">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-light btn-block text-left p-3 rounded-0"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <span onClick={() => setCash(false)}>
                          Tarjeta de crédito
                        </span>
                        <div className="icons">
                          <img
                            src="https://i.imgur.com/2ISgYja.png"
                            width="30"
                            alt="img" />
                          <img
                            src="https://i.imgur.com/W1vtnOV.png"
                            width="30"
                            alt="img" />
                          <img
                            src="https://i.imgur.com/35tC99g.png"
                            width="30"
                            alt="img" />
                          <img
                            src="https://i.imgur.com/2ISgYja.png"
                            width="30"
                            alt="img" />
                        </div>
                      </div>
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body payment-card-body">
                    <span className="font-weight-normal card-text">
                      Número de tarjeta
                    </span>
                    <div className="input">
                      <i className="fa fa-credit-card"></i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0000 0000 0000 0000"
                        name="paymentMethod"
                        value={method.paymentMethod}
                        onChange={handleInputChange}
                        autoComplete="off" />
                    </div>

                    <div className="row mt-3 mb-3">
                      <div className="col-md-6">
                        <span className="font-weight-normal card-text">
                          Fecha de expiración
                        </span>
                        <div className="input">
                          <i className="fa fa-calendar"></i>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <span className="font-weight-normal card-text">
                          CVC/CVV
                        </span>
                        <div className="input">
                          <i className="fa fa-lock"></i>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="000" />
                        </div>
                      </div>
                    </div>

                    <span className="text-muted certificate-text">
                      <i className="fa fa-lock"></i> Su transacción está
                      asegurada con certificado ssl
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <span>Resumen</span>

          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex flex-column">
                <span>
                  Total a pagar <i className="fa fa-caret-down"></i>
                </span>
              </div>

              <div className="mt-1">
                <sup className="super-price">${subtotal}</sup>
                <span className="super-month">/total</span>
              </div>
            </div>

            <hr className="mt-0 line" />

            <div className="p-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Estado de la venta</span>
                {/* <span>-$2.00</span> */}
              </div>

              <div className="d-flex justify-content-between">
                <span>
                  {status} <i className="fa fa-clock-o"></i>
                </span>
                {/* <span>-20%</span> */}
              </div>
            </div>

            <hr className="mt-0 line" />

            <div className="p-3 d-flex justify-content-between">
              <div className="d-flex flex-column">
                <span>Cambio</span>
                <small>Tiene hasta el último día del mes para facturar</small>
              </div>
              <span>$0</span>
            </div>

            <div className="p-3">
              <button
                className="btn btn-primary btn-block free-button"
                onClick={pay}
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};
