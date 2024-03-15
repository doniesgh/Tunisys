const express = require('express')
const router = express.Router()
const {SolveTicket,StartTicket,getAssignedPhoneTickets, getAssignedFieldTickets,getFieldTickets, addPhoneTicket, getPhoneTickets, getTicketById,
     countTickets,ReportTicket, AcceptTicket,solvingTicketbyCoordinatrice, transferTicket, deleteTicket, updateTicket, solvedTicket, ApprovedTicket,
     ResetToSolved, getReclamationsByDay
} = require('../controllers/ticketController')
router.post('/phone', addPhoneTicket)
/////////////////////////////////////////////// STATUS ////////////////////////////////////////////////////////
router.put('/approved/:ticketId', ApprovedTicket)
router.put('/resetToSolved/:ticketId', ResetToSolved)
router.put('/accepted/:ticketId', AcceptTicket)
router.put('/started/:ticketId', StartTicket)
router.put('/solved/:ticketId', SolveTicket)
router.put('/reported/:ticketId', ReportTicket)
router.put('/solving/phone/:ticketId', solvingTicketbyCoordinatrice)
router.put('/:ticketId', updateTicket)
router.put('/transfer/:ticketId', transferTicket)
router.get('/phone', getPhoneTickets)
router.get('/number', countTickets)
router.get('/solved', solvedTicket)
router.get('/field', getFieldTickets)
router.get('/:ticketId', getTicketById)
router.get('/assigned/phone', getAssignedPhoneTickets)
router.get('/assigned/field', getAssignedFieldTickets)
router.delete('/:ticketId', deleteTicket)
router.delete('/:ticketId', deleteTicket)
router.get('/chart',getReclamationsByDay)
module.exports = router 