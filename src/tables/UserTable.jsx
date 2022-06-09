import React from "react";
import "../styles/bootstrap.min.css"

const data = {
  paymentID: 1,
  referenceID: "929184819",
  address_cp: null,
  paymentDate: "2022-06-03T13:56:36.625563",
  paymentStatus: "C",
  positivePaymentDate: "2022-06-03T17:43:23.579216",
  paymentAmount: 891,
  paymentMethod: "4718343217000000",
  statusDelete: null,
};

const UserTable = (props) => (
  <div className="table-responsive">
  <table className="table table-bordered caption-top">
  <caption>Historial de pagos</caption>
    <thead className="table-primary">
      <tr>
        <th className="fs-6">referenceID</th>
        <th className="fs-6">paymentDate</th>
        <th className="fs-6">paymentStatus</th>
        <th className="fs-6">positivePaymentDate</th>
        <th className="fs-6">paymentAmount</th>
        <th className="fs-6">paymentMethod</th>
        <th className="fs-6">Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user.paymentID}>
            <td>{user.referenceID}</td>
            <td>{user.paymentDate}</td>
            <td>{user.paymentStatus}</td>
            <td>{user.positivePaymentDate}</td>
            <td>{user.paymentAmount}</td>
            <td>{user.paymentMethod}</td>   
            <td>
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
