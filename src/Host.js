const Payment = {
    local: 'http://localhost:8080/api/payment/',
    develop: 'https://payment-tester.herokuapp.com/api/payment/'
}

const Auth = {
    verify : 'https://autenticacion-t.herokuapp.com/login/auth/token/',
    login : 'https://autenticacion-t.herokuapp.com/login/auth/user'
}

const Host = {
    purchases : 'https://compras-testing.herokuapp.com/api/compras/',
    payment : Payment.develop,
    sales : 'https://ventas-it-d.herokuapp.com/api/venta',
    customer : 'https://client-development.herokuapp.com/api/cliente/',
    auth : Auth,
    tdd : 'https://tarjeta-debito-service.herokuapp.com/api/v1/payments/',
    stock : 'https://compras-testing.herokuapp.com/api/compras/vender/'
}

export { Host }
