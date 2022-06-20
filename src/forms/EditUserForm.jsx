import React, { useState, useEffect } from 'react'
import "../styles/bootstrap.min.css"


const EditPaymentForm = props => {
  const [ payment, setPayment ] = useState(props.currentPayment)

  useEffect(() => {
      setPayment(props.currentPayment)
    },[ props ])
  const handleInputChange = event => {
    const { name, value } = event.target

    setPayment({ ...payment, [name]: value })
  }

  return (
    <div className="card border-primary mb-3">
  <div className="card-header">Actualizar pago</div>
  <div className="card-body">
    <form
      onSubmit={event => {
        event.preventDefault()
        
        props.updatePayment(payment.paymentID, payment)
      }}
    >
      <div className='row'>
			<div className="md-form mb-2 col-lg-4">
			<label>Referencia</label>
      <input type="text" name="referenceID" value={payment.referenceID} onChange={handleInputChange}
	  className="form-control validate" 
	  autoComplete="off" />
      </div>
	  <div className="md-form mb-2 col-lg-4">
	  <label>Monto</label>
      <input type="text" name="paymentAmount" value={payment.paymentAmount} onChange={handleInputChange} 
	  className="form-control validate" 
	  autoComplete="off"/>
      </div>
	  <div className="md-form mb-2 col-lg-4">
	  <label>Tarjeta de pago</label>
      <input type="text" name="paymentMethod" value={payment.paymentMethod} onChange={handleInputChange}
	  className="form-control validate" 
	  autoComplete="off" />
	  </div>
	  </div>

      <button className='btn btn-primary mx-1'>Actualizar</button>
      <button onClick={() => props.setEditing(false)} className='btn btn-danger mx-1'>
        Cancelar
      </button>
    </form>
     </div>
     </div>
  )
}

export default EditPaymentForm
