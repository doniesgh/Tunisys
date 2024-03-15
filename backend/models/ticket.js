const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema(
  {
    reference: {
      type: String
    },
    type: {
      type: String,
      enum: ['PHONE', 'FIELD']
    },

    service_station: {
      type: String
    },
    service_type: {
      type: String
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
    solving_time: {
      type: Date
    },
    completion_time: {
      type: Date
    },
    starting_time:{
      type:Date
    },
    attachement: {
      type: String
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
      required: true,
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
    call_time: {
      type: Date
    },
    garantie_start_date: {
      type: Date
    },
    garantie_end_date: {
      type: Date
    },
    solution: {
      type: String
    },
    status: {
      type: String, default: 'ASSIGNED',
      enum: ['ASSIGNED', 'SOLVED', 'ACCEPTED', 'APPROVED','LOADING','REPORTED']
    },
    note: {
      type: String
    },
    raison_transfert: {
      type: String
    },
  },
  {
    timestamps: { 
    createdAt: 'created_at', 
    updatedAt: 'updated_at'  
  }
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
