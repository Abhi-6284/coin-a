const router = require('express').Router();
const controller = require('../Controllers/api.controller');
// const { body } = require('express-validator');

// const routes = {
//     '/login': [controller.postLogin],
//     '/register': [controller.postRegister],
//     '/resetPassword': [controller.postReset],
//     '/edit/User': [controller.postEditUser],
//     '/create/User': [controller.postCreateUser],
//     '/delete/User': [controller.postDeleteUser],
//     '/edit/Customer': [controller.postEditCustomer],
//     '/create/Customer': [controller.postCreateCustomer],
//     '/delete/Customer': [controller.postDeleteCustomer],
//     '/edit/service': [controller.postEditService],
//     '/create/service': [controller.postCreateService],
//     '/delete/service': [controller.postDeleteService],
//     '/mode/payment': [controller.postModePayment],
// }
const routes = {
    '/login': [controller.postLogin],
    '/register': [controller.postRegister],
}
for (const [path, handlers] of Object.entries(routes)) {
    router.post(path, handlers);
}
module.exports = router;