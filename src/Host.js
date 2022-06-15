const Payment = {
    local: 'http://localhost:8080/api/payment/',
    develop: 'https://payment-development.herokuapp.com/api/payment/'
}

const Host = {
    purchases : 'https://compras-develop.herokuapp.com/api/compras/',
    payment : Payment.develop,
    sales : 'https://ventas-it-d.herokuapp.com/api/venta'
}

export { Host }
