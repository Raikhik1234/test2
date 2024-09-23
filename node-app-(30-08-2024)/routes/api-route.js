const express = require('express');
const router = express.Router();
const multer = require('multer');
const ApiController = require('../controllers/api-controller');
const verifyToken = require('../middleware/verifyToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/user')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const uploadFile = multer({ storage: storage });

router.post('/login',  ApiController.login);


router.get('/user/list', verifyToken, ApiController.getUser);
router.post('/user/add', verifyToken, uploadFile.any(), ApiController.addUser);
router.get('/user/info/:id', ApiController.getSingleData);
router.post('/user/update', verifyToken, uploadFile.any(), ApiController.updateUser);
router.get('/user/delete/:id', ApiController.deleteUser);

module.exports = {
    route: router
}