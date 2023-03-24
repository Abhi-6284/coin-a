const router = require('express').Router(), controller = require('../Controllers/api.controller'), postRoutes = { '/login': [controller.postLogin], '/register': [controller.postRegister] }
for (const [path, handlers] of Object.entries(postRoutes)) { router.post(path, handlers) }
const getRoutes = { '/user': [controller.getUsers], '/logout': [controller.getLogout] }
for (const [path, handlers] of Object.entries(getRoutes)) { router.get(path, handlers); }
module.exports = router;