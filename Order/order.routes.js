const express = require('express')
const router = express.Router()
const {
    placeOrder,getOrder
} = require('./order.controller');
const { protect } = require('../middleware/authMiddleware');




//POST a new document
router.post('/place',protect, placeOrder)
router.get('/',protect, getOrder)


module.exports = router;