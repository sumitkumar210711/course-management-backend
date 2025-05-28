const express =require('express');
const { authUserController } = require('../controllers/authController');
const router  = express.Router();

router.post('/auth/login',
    authUserController
);

module.exports = router;
