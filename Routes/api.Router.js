const router = require('express').Router();
const controller = require('../Controllers/api.controller');
const { verifyToken } = require('../Middleware/auth');

const postRoutes = { 
    '/login': [controller.postLogin],
    '/register': [controller.postRegister] 
}

for (const [path, handlers] of Object.entries(postRoutes)) { 
    router.post(path, handlers) 
}

const getRoutes = { 
    '/user': [controller.getUsers], 
    '/logout': [controller.getLogout] 
}

for (const [path, handlers] of Object.entries(getRoutes)) { 
    router.get(path, verifyToken, handlers); 
}

module.exports = router;