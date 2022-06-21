const Payment = {
    local: 'http://localhost:8080/api/payment/',
    develop: 'https://payment-tester.herokuapp.com/api/payment/',
    deploy: 'https://payment-d.herokuapp.com/api/payment/'
}

const Auth = {
    verify : 'https://autenticacion-p.herokuapp.com/login/auth/token/',
    login : 'https://autenticacion-p.herokuapp.com/login/auth/user'
}

const tddtest = 'https://tarjeta-debito-service.herokuapp.com/api/v1/payments/'

const Host = {
    purchases : 'https://compras-deploy.herokuapp.com/api/v1/productos/',
    payment : Payment.deploy,
    sales : 'https://venta-it.herokuapp.com/api/venta',
    customer : 'https://client-app-d.herokuapp.com/api/cliente/',
    auth : Auth,
    tdd : 'https://tarjeta-debito-service.herokuapp.com/api/v1/payments/',
    stock : 'https://compras-deploy.herokuapp.com/api/v1/productos/vender/'
}

export { Host }
