import React, { Fragment, useState } from "react";
import "./styles/bootstrap.min.css";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import { Host } from "./Host";
import { Fetch } from "./utilities/fetch";
import { PaymentItem } from "./components/PaymentItem";
import { Verify } from "./utilities/fetch";
import { RegexCard } from "./utilities/regex";

export const PaymentCrud = (props) => {
  const {toast} = props
  //COMO APARECE PRIMERAMENTE EL FORMULARIO PARA CREAR UN PAGO
  const initialFormState = {
    referenceID: "00000000",
    paymentAmount: 0,
    paymentMethod: "0000000000000000",
  };

  //LISTA DE TODOS LOS PAGOS QUE EXISTEN EN LA API
  const [payments, setPayments] = useState([]);
  //PARA SELECCIONAR QUE PAGO SE ESTA EDITANTO
  const [currentPayment, setCurrentPayment] = useState(initialFormState);
  //DEPENDIENDO SI ES TRUE O FALSE SE MUESTRA EL FORMULARIO DE EDITAR O AGREGAR
  const [editing, setEditing] = useState(false);

  React.useEffect(() => {
    console.log("Renderizando PaymentCrud...");
    //SE HACE EL FETCH PARA OBTENER TODOS LOS PAGOS
    fetch(Host.payment + "records")
      .then((res) => res.json())
      .then((data) => {
        //SE GUARDAN LOS PAGOS
        setPayments(data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [setPayments]);

  //METODO PARA AGREGAR UN PAGO
  const addPayment = async (data) => {
    //PRIMERO SE VALIDAN LAS 3 ENTRADAS, DE NO SER ASI SE COLOCA RETURN PARA QUE NO SIGA
    if(data.referenceID.length > 10){
      toast('La referencia no puede sobrepasar 10 caracteres')
      return;
    }
    if(data.paymentAmount < 1){
      toast('Ingrese una cantidad válida')
      return;
    }
    if(data.paymentMethod !== 'Efectivo' && !RegexCard(data.paymentMethod)){
      toast('Ingrese un método de pago válido')
      return;
    }
    //SE VERIFICA LA SESIÓN
    Verify()
      .then((r) => {
        if (r.status === 200) {
          //SI ES CORRECTA SE MANDA EL POST A LA API DE PAGOS
          console.log(data);
          Fetch(Host.payment + "pay", "POST", data)
            .then((res) => {
              if (res.status === 201) {
                return res.json();
              } else {
                return {};
              }
            })
            .then((j) => {
              if (JSON.stringify(j).includes("paymentID")) {
                //SE AGREGA EL NUEVO PAGO A LA LISTA DE PAGOS
                setPayments([...payments, j]);
                toast('Pago agregado correctamente')
              }
            });
        } else {
          toast("Por favor inicie sesión");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //PARA ELIMINAR UNO DE LOS PAGOS
  const deletePayment = (paymentID) => {
    //PRIMERO SE VERIFICA LA SESIÓN
    Verify()
      .then((r) => {
        if (r.status === 200) {
          //SI ES CORRECTA SE REALIZA EL DELETE
          Fetch(Host.payment + "delete/" + paymentID, "DELETE", {})
            .then((res) => {
              console.log(res);
              if (res.status === 202) {
                return res.json();
              } else {
                return {};
              }
            })
            .then((j) => {
              //SI SE RESPONDIO CORRECTAMENTE
              if (JSON.stringify(j).includes("paymentID")) {
                setEditing(false);
                //SE FILTRAN LOS PAGOS Y SE ELIMINA EL PAGO QUE TENIA EL ID QUE SE ELIMINO
                setPayments(
                  payments.filter((payment) => payment.paymentID !== paymentID)
                );
                toast('Pago eliminado correctamente')
              }
            });
        } else {
          toast("Por favor inicie sesión");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //METODO PARA ACTUALIZAR UN PAGO
  const updatePayment = (paymentID, updatedPayment) => {
    //SE VERIFICA LA SESIÓN
    Verify()
      .then((r) => {
        if (r.status === 200) {
          setEditing(false);
          const body = Object.assign({}, updatedPayment);
          delete body.paymentID;
          //SE MANDA EL PUT CON LOS NUEVOS DATOS DEL PAGO EN EL BODY
          Fetch(Host.payment + "update/" + paymentID, "PUT", body)
            .then((res) => {
              if (res.status === 202) {
                return res.json();
              } else {
                return {};
              }
            })
            .then((j) => {
              //SI EL SERVICIO CONTESTO CORRECTAMENTE
              if (JSON.stringify(j).includes("paymentID")) {
                //SE REEMPLAZA DENTRO DE LA LISTA DE PAGOS EL PAGO CON EL MISMO ID POR EL NUEVO
                setPayments(
                  payments.map((payment) =>
                    payment.paymentID === paymentID ? j : payment
                  )
                );
                toast('Pago actualizado correctamente')
              }
            });
        } else {
          toast("Por favor inicie sesión");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //METODO PARA CONFIRMAR EL PAGO
  const confirmPayment = (paymentID) => {
    //SE VERIFICA LA SESIÓN
    Verify()
      .then((r) => {
        if (r.status === 200) {
          //SI ES CORRECTA SE HACE EL PUT A LA API
          Fetch(Host.payment + "confirm/" + paymentID, "PUT", {})
            .then((res) => {
              if (res.status === 202) {
                return res.json();
              } else {
                return {};
              }
            })
            .then((j) => {
              if (JSON.stringify(j).includes("paymentID")) {
                //SI LA RESPUESTA DE LA API ES BUENA, SE REEMPLAZA EL PAGO QUE SE TENIA EN LA
                //LISTA POR EL NUEVO PARA QUE TENGA LOS NUEVO DATOS
                setPayments(
                  payments.map((payment) =>
                    payment.paymentID === paymentID ? j : payment
                  )
                );
                toast('Se ha confirmado el pago')
              }
            });
        } else {
          toast("Por favor inicie sesión");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //CANCELAR ES LO MISMO QUE CONFIRMAR PERO EN VEZ DE CONFIRMAR CANCELAS XDD
  const cancelPayment = (paymentID) => {
    Verify()
      .then((r) => {
        if (r.status === 200) {
          Fetch(Host.payment + "cancel/" + paymentID, "PUT", {})
            .then((res) => {
              if (res.status === 202) {
                return res.json();
              } else {
                return {};
              }
            })
            .then((j) => {
              if (JSON.stringify(j).includes("paymentID")) {
                setPayments(
                  payments.map((payment) =>
                    payment.paymentID === paymentID ? j : payment
                  )
                );
                toast('Pago cancelado')
              }
            });
        } else {
          toast("Por favor inicie sesión");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //PARA QUE CUANDO SE DE EDITAR A UN PAGO
  const editRow = (payment) => {
    //APAREZCA EL FORMULARIO DE ACTUALIZAR
    setEditing(true);

    //Y LA INFORMACIÓN DEL PAGO ACTUAL CAMBIE
    setCurrentPayment({
      paymentID: payment.paymentID,
      referenceID: payment.referenceID,
      saleID: payment.saleID,
      paymentDate: payment.paymentDate,
      positivePaymentDate: payment.positivePaymentDate,
      paymentStatus: payment.paymentStatus,
      paymentAmount: payment.paymentAmount,
      paymentMethod: payment.paymentMethod,
      uuid: payment.uuid,
      statusDelete: payment.statusDelete,
      log: payment.log,
    });
  };

  return (
    <div className="container">
      <h1>CRUD de pagos</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentPayment={currentPayment}
                updatePayment={updatePayment}
              />
            </Fragment>
          ) : (
            <Fragment>
              <AddUserForm addPayment={addPayment} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          {payments.map((pay) => (
            //POR CADA PAGO SE MAPEA UNO DE ESTOS COMPONENTES, QUE TIENE LA INFROMACION Y LOS BOTONES
            <PaymentItem
              key={pay.paymentId}
              data={pay}
              editRow={editRow}
              deletePayment={deletePayment}
              confirmPayment={confirmPayment}
              cancelPayment={cancelPayment}
            />
          ))}
        </div>
      </div>
      <PaymentItem />
    </div>
  );
};
