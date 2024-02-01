const Ticket = require('../models/ticket');
const Equipement = require('../models/equipement');
const User = require('../models/userModel'); 
const mongoose = require('mongoose');
const Notification = require('../models/notification')
const addFieldTicket = async (req, res) => {
  try {
    const { technicien, equipement } = req.body;

    if (!technicien || !equipement) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const equipementExists = await Equipement.findById(equipement);

    if (!equipementExists) {
      return res.status(404).json({ error: 'Equipement not found' });
    }

    const technicienExists = await User.findById(technicien);

    if (!technicienExists) {
      return res.status(404).json({ error: 'Technicien not found' });
    }

    const newTicket = new Ticket({
      equipement: equipementExists._id,
      technicien: technicienExists._id,
    });

    // Save the ticket to the database
    const savedTicket = await newTicket.save();
    const notification = await Notification.create({
      receiverId: technicien,
      message: `Nouveau ticket`,
    });
    //sendSSEToUser(technicienExists._id.toString(), JSON.stringify(notification));

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


/*
const addFieldTicket = async (req, res) => {
  try {
    const { technicien, equipement } = req.body;

    if (!technicien || !equipement) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const equipementExists = await Equipement.findById(equipement);

    if (!equipementExists) {
      return res.status(404).json({ error: 'Equipement not found' });
    }

    const technicienExists = await User.findById(technicien);

    if (!technicienExists) {
      return res.status(404).json({ error: 'Technicien not found' });
    }

    const newTicket = new Ticket({
      equipement: equipementExists._id,
      technicien: technicienExists._id,
    });

    // Save the ticket to the database
    const savedTicket = await newTicket.save();

    // Notify the assigned user in real-time
    const assignedSocket = io.sockets.sockets.get(technicienExists._id.toString());
    
    if (assignedSocket) {
      assignedSocket.emit('newTicketAssigned', savedTicket);
    }

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTicketById = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addFieldTicket,
  getTicketById,
  getAllTickets
};
