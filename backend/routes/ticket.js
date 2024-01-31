const express = require('express')
const router = express.Router()
const {addFieldTicket} = require('../controllers/ticketController')
router.post('/',addFieldTicket)


module.exports = router 