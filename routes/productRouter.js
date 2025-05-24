const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');
const upload = require('../middlewares/uploadfile')

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.post('/addProduct',upload.single('file'), productController.addProduct);
router.put('/updateProductById/:id', productController.UpdateProductById);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getProductOwner', productController.getProductOwner);
router.post('/addProductWithOwner', productController.addProductWithOwner);
router.get('/getCountProduct', productController.getCountProduct);

module.exports = router;
