const express = require('express');
const router = express.Router();
const upload = require('../index');

const authController = require('../controllers/authController');
const is_auth = require('../middlewares/is_auth');
const is_admin = require('../middlewares/is_admin');

router.post('/auth/register',upload.single('thumb'), authController.register);
router.post('/auth/signin', authController.login);

router.get('/auth/users', is_auth, is_admin, authController.getAllUsers);
router.put('/auth/user/role/:id', is_auth, is_admin, authController.setUserRole);

// edit profile
router.get('/auth/profile/:id', is_auth, authController.getOneUser);
router.put('/auth/editprofile/:id',is_auth, upload.single('thumb'), authController.editProfile);

// delete user
router.delete('/auth/user/delete/:id', is_auth, is_admin, authController.deleteUser);


module.exports = router; 