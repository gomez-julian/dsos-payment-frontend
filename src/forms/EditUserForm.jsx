import React, { useState, useEffect } from 'react'
import "../styles/bootstrap.min.css"


const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <div className="card border-primary mb-3">
  <div className="card-header">Actualizar pago</div>
  <div className="card-body">
    <form
      onSubmit={event => {
        event.preventDefault()
        
        props.updateUser(user.paymentID, user)
      }}
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

      <button className='btn btn-primary mx-1'>Actualizar</button>
      <button onClick={() => props.setEditing(false)} className='btn btn-danger mx-1'>
        Cancelar
      </button>
    </form>
     </div>
     </div>
  )
}

export default EditUserForm
