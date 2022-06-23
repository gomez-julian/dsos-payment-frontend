import React from "react";
import { Host } from "../Host";
import "../styles/bootstrap.min.css";
import "../styles/PaymentForm.css";
import { RegexCard, RegexCVV, RegexExpiry } from "../utilities/regex";
import { Fetch, FetchGet, Verify } from "../utilities/fetch";

export const PaymentForm = (props) => {
  const { cart, setCart, toast } = props;
  //SI SE VA A USAR EFECTIVO O NO
  const [cash, setCash] = React.useState(false);
  //MEOTODO DE PAGO POR DEFAULT
  const [method, setMethod] = React.useState({
    paymentMethod: "4756499672538289",
  });
  //PARA LA VERIFICACION DE LA TARJETA DE CREDITO
  const [tdd, setTdd] = React.useState({
    expiry: "12/2022",
    cvv: "188",
  });
  //SUBTOTAL DE LA COMPRA
  const [subtotal, setSubtotal] = React.useState(0);
  //LISTA DE CLIENTES A LOS QUE SE LES PUEDE REGISTRAR UNA VENTA
  const [customers, setCustomers] = React.useState([]);
  const [rfc, setRfc] = React.useState("X");

  //PARA EL SERVICIO DE TARJETA, UNA BASE POR DEFAULT
  const defaultTDD = {
    tarjeta: {
      numero: "4756499672538289",
      mesVencimiento: 12,
      anioVencimiento: 2022,
      cvv: 153,
    },
    monto: 5,
  };

  React.useEffect(() => {
    console.log("Renderizando PaymentForm...");
    //AL CREARSE SE CALCULA EL TOTAL A PAGAR
    let total = 0;
    cart.map((e) => (total += e.precioVenta));
    setSubtotal(total);
    //SE OBTIENEN LOS CLIENTES 
    FetchGet(Host.customer)
      .then((r) => {
        console.log(r);
        if (r.status === 200) {
          return r.json();
        } else {
          return { data: [] };
        }
      })
      .then((j) => {
        //SE GUARDAN LOS CLIENTES
        setCustomers(j.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setSubtotal, setCustomers, cart]);

  //PARA CONTROLAR LOS CAMBIOS EN LOS INPUTS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMethod({ ...method, [name]: value });
  };

  //PARA CONTROLAR LOS CAMBIOS EN LOS INPUTS DE CVV Y FECHA
  const handleInputChangeTdd = (event) => {
    const { name, value } = event.target;
    setTdd({ ...tdd, [name]: value });
  };

  //NO SE UTILIZA POR EL MOMENTO PARA NO TRONAR EL SERVICIO DE ELLOS
  const postSale = (total) => {
    const body = {
      rfc: rfc,
      costoTotal: total,
      cantidadPagada: total,
      cambio: 0,
      fecha: "",
      observaciones: "Creada por Judie",
      estado: "Aprobado",
      estatusDelete: false,
    };

    Fetch(Host.sales, "POST", body)
      .then((r) => {
        console.log("Status POST sales: " + r.status + cash);
        if (r.status === 201) {
          // discountStock();
          return r.json();
        } else {
          console.log(r.json());
          toast("No se ha podido hacer la venta");
          return {};
        }
      })
      .then((j) => {
        if (JSON.stringify(j).includes("data")) {
          const ref = j.data[1];
          cart.map((e) =>
            Fetch(Host.sales + "/" + ref + "/ventadetalle", "POST", {
              cantidadProducto: 1,
              costoUnitario: e.precioVenta,
              costoTotal: e.precioVenta,
              estatusDelete: true,
              idProducto: e.idProducto,
            })
          );
          if (cash) {
            postPayment(total, ref);
          } else {
            defaultTDD.monto = total;
            defaultTDD.tarjeta.numero = method.paymentMethod;
            defaultTDD.tarjeta.cvv = tdd.cvv;
            console.log(defaultTDD);
            Fetch(Host.tdd, "POST", defaultTDD).then((r) => {
              console.log(defaultTDD);
              console.log(r);
              console.log("Status POST TDD: " + r.status);
              if (r.status === 201) {
                postPayment(total, ref);
              } else {
                toast("La verificación de la tarjeta falló");
              }
            });
            // postPayment(total, ref);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //METODO PARA REALIZAR EL PAGO A LA API
  const postPayment = (total, reference) => {
    //SE CREA EL CUERPO DE LA SOLICITUD
    const body = {
      ...method,
      saleID: reference,
      paymentAmount: total,
    };
    //SI ES EN EFECTIVO SE CAMBIA EL METODO DE PAGO
    if (cash) {
      body.paymentMethod = "Efectivo";
    }
    console.log(body);
    //SE REALIZA EL POST A LOS PAGOS
    Fetch(Host.payment + "pay", "POST", body)
      .then((r) => {
        console.log("Status POST payment: " + r.status);
        //SI SE COMPLETA SE MANDA EL MENSAJE Y SE VACIA EL CARRITO
        if (r.status === 201) {
          toast("La venta se completó exitosamente");
          setCart([]);
        } else {
          toast("No se pudo realizar el pago");
          console.log(r.json());
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //METODO AL MOMENTO DE DAR CLIC EN PAGAR
  const pay = () => {
    //SI NO ES EFECTIVO VALIDA EL NUMERO DE TARJETA, FECHA Y CVV CON EXPRESIONES REGULARES
    if (!cash) {
      if (!RegexCard(method.paymentMethod)) {
        toast("Ingrese un método de pago válido");
        return;
      }
      if (!RegexExpiry(tdd.expiry)) {
        toast("Ingrese la fecha de expriación de la forma MM/YYYY");
        return;
      }
      if (!RegexCVV(tdd.cvv)) {
        toast("Ingrese un CVV válido");
        return;
      }
    }
    //SE VERIFICA SI LA SESIÓN ES VALDIA
    Verify()
      .then((r) => {
        //SI ES VALIDA
        if (r.status === 200) {
          //SE CREA UN ID RANDOM PARA REGISTRAR EL ID DE LA VENTA EN PAGOS
          const ref = Math.floor(Math.random()*50);
          console.log("Verificado");
          //SE CALCULA EL TOTAL
          let total = 0;
          cart.map((e) => (total += e.precioVenta));
          if (total !== 0) {
            //SI ES MAS QUE CERO REALIZA EL DESCUENTO DE PRODUCTOS
            // postSale(total);
            discountStock();
            if (cash) {
              //SI ES EFECTIVO REALIZA DIRECTAMENTE EL PAGO
              postPayment(total, ref);
            } else {
              //SI ES POR TARJETA PRIMERO SE REALIZA LA VERIFICACION DE LA TARJETA
              //CON EL API DEL PROFE
              defaultTDD.monto = total;
              defaultTDD.tarjeta.numero = method.paymentMethod;
              defaultTDD.tarjeta.cvv = tdd.cvv;
              console.log(defaultTDD);
              //SE HACE EL POST A LA TARJETA DE CREDITO
              Fetch(Host.tdd, "POST", defaultTDD).then((r) => {
                console.log(defaultTDD);
                console.log(r);
                console.log("Status POST TDD: " + r.status);
                if (r.status === 201) {
                  //SI FUE ACEPTADA SE REALIZA EL PAGO EN NUESTRA API
                  postPayment(total, ref);
                } else {
                  toast("La verificación de la tarjeta falló");
                }
              });
              // postPayment(total, ref);
            }
          } else {
            toast("No hay productos en el carrito");
          }
        } else {
          toast("Por favor inicie sesión");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const discountStock = () => {
    cart.map((e) => {
      //POR CADA UNO DE LOS PRODUTOS EN EL CARRITO SE HACE EL DESCUENTO
      console.log(`${Host.stock}${e.idProducto}/1`);
      Fetch(`${Host.stock}${e.idProducto}/1`, "PUT", {}).catch((e) => {
        console.log(e);
      });
    });
  };

  //PARA CONTROLAR A QUE RFC DE QUE CLIENTE SE VA A REFERENCIAR LA VENTA (POR EL MOMENTO NO SE USA)
  const opcionChange = (e) => {
    setRfc(e.target.value);
  };

  return (
    <>
      <div className="container d-flex justify-content-center mt-5 mb-5">
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
                            alt="img"
                          />
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
                              alt="img"
                            />
                            <img
                              src="https://i.imgur.com/W1vtnOV.png"
                              width="30"
                              alt="img"
                            />
                            <img
                              src="https://i.imgur.com/35tC99g.png"
                              width="30"
                              alt="img"
                            />
                            <img
                              src="https://i.imgur.com/2ISgYja.png"
                              width="30"
                              alt="img"
                            />
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
                          autoComplete="off"
                        />
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
                              placeholder="MM/YY"
                              name="expiry"
                              value={tdd.expiry}
                              onChange={handleInputChangeTdd}
                            />
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
                              placeholder="000"
                              name="cvv"
                              value={tdd.cvv}
                              onChange={handleInputChangeTdd}
                            />
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
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Cliente
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    defaultValue={rfc}
                    onChange={opcionChange}
                  >
                    {customers.map((data) => (
                      <option value={data.rfc} key={data.rfc}>
                        {data.nombre} {data.apellidos}
                      </option>
                    ))}
                  </select>
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
      </div>
    </>
  );
};
