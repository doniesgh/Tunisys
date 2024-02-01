const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema(
  {
    ticket_no: {
      type: String
    },
    equipement_sn: {
      type: String
    },
    service_station: {
      type: String
    },
    fault_type: {
      type: String
    },
    response_time: {
      type: Date
    },
    fixing_time: {
      type: Date
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    localisation: {
      type: String
    },
    receiving_time: {
      type: String
    },
    accepting_time: {
      type: Date
    },
    departure_time: {
      type: String
    },
    arrival_time: {
      type: Date
    },
    completion_time: {
      type: Date
    },
    attachement: {
      type: String
    },
    contact: {
      type: String
    },
    equipement: {
      type: Schema.Types.ObjectId,
      ref: 'Equipement',
      required: true,
    },
    technicien: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: String,
    status: { type: String, default: 'assigned' },
  },
  {
    timestamp: { type: Date, default: Date.now },
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
