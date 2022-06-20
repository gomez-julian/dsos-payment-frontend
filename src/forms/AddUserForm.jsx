import React, { useState } from 'react'
import "../styles/bootstrap.min.css"

const AddUserForm = props => {
	const initialFormState = {
		referenceID: "00000000",
		paymentAmount: 0,
		paymentMethod: "0000000000000000",
	  };
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}

	const onSubmitData=(event) => {
		event.preventDefault()
		props.addPayment(user)
		setUser(initialFormState)
	}

	return (
		<div className="card border-success mb-3">
  <div className="card-header">Nuevo pago</div>
  <div className="card-body">
  <form
			onSubmit={onSubmitData}
		>
			<div className='row'>
			<div className="md-form mb-2 col-lg-4">
			<label>Referencia</label>
      <input type="text" name="referenceID" value={user.referenceID} onChange={handleInputChange}
	  className="form-control validate" 
	  autoComplete="off" />
      </div>
	  <div className="md-form mb-2 col-lg-4">
	  <label>Monto</label>
      <input type="text" name="paymentAmount" value={user.paymentAmount} onChange={handleInputChange} 
	  className="form-control validate" 
	  autoComplete="off"/>
      </div>
	  <div className="md-form mb-2 col-lg-4">
	  <label>Tarjeta de pago</label>
      <input type="text" name="paymentMethod" value={user.paymentMethod} onChange={handleInputChange}
	  className="form-control validate" 
	  autoComplete="off" />
	  </div>
	  </div>
			<button className='btn btn-success'>Pagar</button>
		</form>
  </div>
</div>
		
	)
}

export default AddUserForm
