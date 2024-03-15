const express = require('express')
const router = express.Router()
const { getAssignedPhoneTickets, getAssignedFieldTickets,getAssignedTickets,

} = require('../controllers/ticketController')
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)
router.get('/approved/all', getAssignedTickets)
router.get('/assigned/phone', getAssignedPhoneTickets)
router.get('/assigned/field', getAssignedFieldTickets)
module.exports = router 