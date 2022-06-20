import React from "react";
import "../styles/bootstrap.min.css"

const UserTable = (props) => (
  <div className="table-responsive">
  <table className="table table-bordered caption-top">
  <caption>Historial de pagos</caption>
    <thead className="table-primary">
      <tr>
        <th className="fs-6">referenceID</th>
        <th className="fs-6">saleID</th>
        <th className="fs-6">paymentDate</th>
        <th className="fs-6">paymentStatus</th>
        <th className="fs-6">positivePaymentDate</th>
        <th className="fs-6">paymentAmount</th>
        <th className="fs-6">paymentMethod</th>
        <th className="fs-6">UUID</th>
        <th className="fs-6" colSpan={2}>Actions</th>
        <th className="fs-6" colSpan={2}>Estado</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user.paymentID}>
            <td>{user.referenceID}</td>
            <td>{user.saleID}</td>
            <td>{user.paymentDate}</td>
            <td>{user.paymentStatus}</td>
            <td>{user.positivePaymentDate}</td>
            <td>{user.paymentAmount}</td>
            <td>{user.paymentMethod}</td>
            <td>{user.uuid}</td>      
            <td colSpan={2}>
              <button
                onClick={() => {
                  props.editRow(user);
                }}
                className="btn btn-info my-1"
              >
                Editar
              </button>
              <button
                onClick={() => props.deleteUser(user.paymentID)}
                className="btn btn-danger my-1"
              >
                Eliminar
              </button>
            </td>
            <td>
            <button
                onClick={() => props.confirmPayment(user.paymentID)}
                className="btn btn-success my-1"
              >
                Confirmar
              </button>
              <button
                onClick={() => props.cancelPayment(user.paymentID)}
                className="btn btn-warning my-1"
              >
                Cancelar
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7}>No hay pagos</td>
        </tr>
      )}
    </tbody>
  </table>
  </div>
);

export default UserTable;
