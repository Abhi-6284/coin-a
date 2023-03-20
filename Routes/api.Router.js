const router = require('express').Router();
const controller = require('../Controllers/api.controller');
// const { body } = require('express-validator');

// const routes = {
//     '/login': [controller.postLogin],
//     '/uregister': [controller.postRegister],
//     '/gresetPassword': [controller.postReset],
//     '/uedit/User': [controller.postEditUser],
//     '/ncreate/User': [controller.postCreateUser],
//     '/delete/User': [controller.postDeleteUser],
//     '/edit/Customer': [controller.postEditCustomer],
//     '/create/Customer': [controller.postCreateCustomer],
//     '/delete/Customer': [controller.postDeleteCustomer],
//     '/edit/service': [controller.postEditService],
//     '/create/service': [controller.postCreateService],
//     '/delete/service': [controller.postDeleteService],
//     '/mode/payment': [controller.postModePayment],
// }
const postRoutes = {
    '/login': [controller.postLogin],
    '/register': [controller.postRegister],
}
for (const [path, handlers] of Object.entries(postRoutes)) {
    router.post(path, handlers);
}

const getRoutes = {
    '/user': [controller.getUsers],
    '/logout': [controller.getLog]
}
for (const [path, handlers] of Object.entries(getRoutes)) {
    router.get(path, handlers);
}
module.exports = router;