const express = require('express');
const { addService,fetchServiceById, getAllServices ,fetchServices} = require('../controllers/serviceController');
const router = express.Router()
router.post('/add',addService)
router.get('/liste',fetchServices)
router.get('/:serviceId',fetchServiceById)
module.exports = router 