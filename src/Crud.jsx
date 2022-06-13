import React, { useState, Fragment } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";
import { Host } from "./Host";

const Crud = () => {
  // Data
  const usersData2 = [
    {
      paymentID: 100,
      referenceID: "929184819",
      address_cp: null,
      paymentDate: "2022-06-03T13:56:36.625563",
      paymentStatus: "C",
      positivePaymentDate: "2022-06-03T17:43:23.579216",
      paymentAmount: 891,
      paymentMethod: "4718343217000000",
      statusDelete: null,
    },
    {
      paymentID: 300,
      referenceID: "119004822",
      address_cp: null,
      paymentDate: "2022-06-03T22:49:31.839",
      paymentStatus: "P",
      positivePaymentDate: null,
      paymentAmount: 218,
      paymentMethod: "2340343217007896",
      statusDelete: null,
    },
  ];

  const initialFormState = {
	referenceID: "00000000",
	paymentAmount: 0,
	paymentMethod: "0000000000000000",
  };

  // Setting state
  const [users, setUsers] = useState(usersData2);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  React.useEffect(() => {
    fetch(Host.payment + 'records')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
      .catch(() => {
        console.log("Error");
      });
  }, [setUsers]);

  async function postData(data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(Host + 'pay', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const deleteRow = async (paymentID, data) => {
    const URI = Host + 'delete/' + paymentID
    console.log(URI)
    const response = await fetch(URI, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      console.log(response.json())
}

const updateRow = async (paymentID, data) => {
  const URI = Host + 'update/' + paymentID
  console.log(URI)
  const response = await fetch(URI, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response
}

  // CRUD operations
  const addUser = async (user) => {
    // user.paymentID = users.length + 1;
    // setUsers([...users, user]);
    console.log(user)
    postData(user)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    setUsers([...users, data]);
  });
      
  };

  const deleteUser = (paymentID) => {
    setEditing(false);
    deleteRow(paymentID);
    setUsers(users.filter((user) => user.paymentID !== paymentID));
  };

  const updateUser = (paymentID, updatedPayment) => {
    setEditing(false);
    const body = Object.assign({}, updatedPayment)
    delete body.paymentID
    console.log(body)
    updateRow(paymentID,body).then(response => {
      console.log(response.status);
      console.log(response.json());  // JSON data parsed by `data.json()` call
    });
    setUsers(users.map((user) => (user.paymentID === paymentID ? updatedPayment : user)));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({
		paymentID: user.paymentID,
		referenceID: user.referenceID,
		address_cp: user.address_cp,
		paymentDate: user.paymentDate,
		paymentStatus: user.paymentStatus,
		positivePaymentDate: user.positivePaymentDate,
		paymentAmount: user.paymentAmount,
		paymentMethod: user.paymentMethod,
		statusDelete: user.statusDelete,
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
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default Crud;
