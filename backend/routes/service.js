const express = require('express');
const { deleteServiceById,addService,fetchServiceById, getAllServices ,fetchServices} = require('../controllers/serviceController');
const router = express.Router()
router.post('/add',addService)
router.get('/liste',fetchServices)
router.get('/:serviceId',fetchServiceById)
router.delete('/:serviceId',deleteServiceById)
module.exports = router 