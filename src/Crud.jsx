import React, { useState, Fragment } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";
import { Host } from "./Host";
import { Fetch } from "./utilities/fetch";
import { PaymentItem } from "./components/PaymentItem";

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


  const addUser = async (data) => {
    console.log(data)
    Fetch(Host.payment + 'pay', 'POST', data).then(res => {
      if(res.status === 201){return res.json()}else{return {}}
  }).then(j => {
    if (JSON.stringify(j).includes("paymentID")){
      setUsers([...users, j]);
    }
  })
      
  };

  const deleteUser = (paymentID) => {
    Fetch(Host.payment + 'delete/' + paymentID, 'DELETE', {}).then(res => {
      console.log(res)
      if(res.status === 202){return res.json()}else{return {}}
  }).then(j => {
    if (JSON.stringify(j).includes("paymentID")){
      setEditing(false);
      setUsers(users.filter((user) => user.paymentID !== paymentID));
    }
  })
  };

  const updateUser = (paymentID, updatedPayment) => {
    setEditing(false);
    const body = Object.assign({}, updatedPayment)
    delete body.paymentID
    Fetch(Host.payment + 'update/' + paymentID, 'PUT', body).then(res => {
      if(res.status === 202){return res.json()}else{return {}}
  }).then(j => {
    if (JSON.stringify(j).includes("paymentID")){
      setUsers(users.map((user) => (user.paymentID === paymentID ? j : user)));
    }
  });
  };

  const confirmPayment = (paymentID) => {
    Fetch(Host.payment + 'confirm/' + paymentID, 'PUT', {}).then(res => {
      if(res.status === 202){return res.json()}else{return {}}
  }).then(j => {
    if (JSON.stringify(j).includes("paymentID")){
      setUsers(users.map((user) => (user.paymentID === paymentID ? j : user)));
    }
  });
  }

  const cancelPayment = (paymentID) => {
    Fetch(Host.payment + 'cancel/' + paymentID, 'PUT', {}).then(res => {
      if(res.status === 202){return res.json()}else{return {}}
  }).then(j => {
    if (JSON.stringify(j).includes("paymentID")){
      setUsers(users.map((user) => (user.paymentID === paymentID ? j : user)));
    }
  });
  }

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({
		paymentID: user.paymentID,
    saleID: user.saleID,
		referenceID: user.referenceID,
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
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} 
          confirmPayment={confirmPayment} cancelPayment={cancelPayment}/>
        </div>
      </div>
      <PaymentItem />
    </div>
  );
};

export default Crud;
