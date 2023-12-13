const express = require('express');
const usersController = require('../controllers/usersController')
const TokenVerifyMiddleware = require('../middleware/TokenVerifyMiddleware');
const router = express.Router();

router.post("/auth/register",usersController.Register)
router.post("/auth/login",usersController.login)
router.post("/seller/create-catalog",TokenVerifyMiddleware,usersController.createCatalog)
router.post("/seller/create-products",TokenVerifyMiddleware,usersController.createProducts)
router.get("/seller/orders/:seller_id",TokenVerifyMiddleware,usersController.getOrders)

router.get("/buyer/list-of-sellers",TokenVerifyMiddleware,usersController.sellerList)
router.get("/buyer/seller-catalog/:seller_id",TokenVerifyMiddleware,usersController.sellerCatalog)
router.get("/buyer/create-order/:seller_id",TokenVerifyMiddleware,usersController.createOrder)


module.exports=router;