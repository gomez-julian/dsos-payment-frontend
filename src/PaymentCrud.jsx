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
  const initialFormState = {
    referenceID: "00000000",
    paymentAmount: 0,
    paymentMethod: "0000000000000000",
  };

  const [payments, setPayments] = useState([]);
  const [currentPayment, setCurrentPayment] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  React.useEffect(() => {
    console.log("Renderizando PaymentCrud...");
    fetch(Host.payment + "records")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [setPayments]);

  const addPayment = async (data) => {
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
    Verify()
      .then((r) => {
        if (r.status === 200) {
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

  const deletePayment = (paymentID) => {
    Verify()
      .then((r) => {
        if (r.status === 200) {
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
              if (JSON.stringify(j).includes("paymentID")) {
                setEditing(false);
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

  const updatePayment = (paymentID, updatedPayment) => {
    Verify()
      .then((r) => {
        if (r.status === 200) {
          setEditing(false);
          const body = Object.assign({}, updatedPayment);
          delete body.paymentID;
          Fetch(Host.payment + "update/" + paymentID, "PUT", body)
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

  const confirmPayment = (paymentID) => {
    Verify()
      .then((r) => {
        if (r.status === 200) {
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

  const editRow = (payment) => {
    setEditing(true);

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
