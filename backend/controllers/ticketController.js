const Ticket = require('../models/ticket');
const Equipement = require('../models/equipement');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const Notification = require('../models/notification')
const addPhoneTicket = async (req, res) => {
  try {
    const {
      technicien,
      equipement,
      service_type,
      equipement_type,
      garantie_end_date,
      garantie_start_date,
      service_station,
      contact,
      service_status,
      client,
      description,
      call_time,
      type,
      reference,
      status,
    } = req.body;

    const emptyFields = [];

    if (!technicien) emptyFields.push('technicien');
    if (!equipement) emptyFields.push('equipement');
    if (!service_type) emptyFields.push('service_type');
    if (!equipement_type) emptyFields.push('equipement_type');
    if (!garantie_end_date) emptyFields.push('garantie_end_date');
    if (!garantie_start_date) emptyFields.push('garantie_start_date');
    if (!service_station) emptyFields.push('service_station');
    if (!contact) emptyFields.push('contact');
    if (!service_status) emptyFields.push('service_status');
    if (!client) emptyFields.push('client');
    if (!description) emptyFields.push('description');
    if (!call_time) emptyFields.push('call_time');
    if (!type) emptyFields.push('type');
    if (!reference) emptyFields.push('reference');
    if (!status) {
      req.body.status = 'ASSIGNED';
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Required fields must be filled', emptyFields });
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
      service_type,
      equipement_type,
      garantie_end_date,
      garantie_start_date,
      service_station,
      contact,
      service_status,
      client,
      description,
      call_time,
      type,
      status,
      reference
    });

    const savedTicket = await newTicket.save();
    const notification = await Notification.create({
      receiverId: technicien,
      message: `Nouveau ticket`,
    });

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const solvedTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: { $in: ['SOLVED', 'APPROVED'] } })
      .populate({
        path: 'client',
        select: 'client',
      })
      .populate({
        path: 'contact',
        select: 'name',
      })
      .populate({
        path: 'equipement',
        select: 'equipement_sn',
      })
      .populate({
        path: 'technicien',
        select: 'firstname lastname email',
      });
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTicketById = async (req, res) => {
  const { ticketId } = req.params;


  try {
    const ticket = await Ticket.findById(ticketId)
      .populate({
        path: 'client',
        select: 'client',
      })
      .populate({
        path: 'contact',
        select: 'name mobile email',
      })
      .populate({
        path: 'equipement',
        select: 'equipement_sn equipement_type modele',
      })
      .populate({
        path: 'technicien',
        select: 'firstname lastname email',
      });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPhoneTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ type: 'PHONE' })
      .populate({
        path: 'client',
        select: 'client',
      })
      .populate({
        path: 'contact',
        select: 'name',
      })
      .populate({
        path: 'equipement',
        select: 'equipement_sn',
      })
      .populate({
        path: 'technicien',
        select: 'firstname lastname email',
      })
      .exec();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Population error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getFieldTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ type: 'FIELD' })
      .populate({
        path: 'client',
        select: 'client',
      })
      .populate({
        path: 'contact',
        select: 'name',
      })
      .populate({
        path: 'equipement',
        select: 'equipement_sn',
      })
      .populate({
        path: 'technicien',
        select: 'firstname lastname email',
      })
      .exec();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Population error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const solvingTicketbyCoordinatrice = async (req, res) => {
  const { ticketId } = req.params;
  const { solving_time, solution } = req.body;

  if (!solving_time || !solution) {
    return res.status(400).json({ error: 'solving_time and solution must not be empty' });
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        solving_time: solving_time,
        solution: solution,
        status: 'SOLVED'
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const transferTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { technicien, raison_transfert } = req.body;

  if (!technicien || !raison_transfert) {
    return res.status(400).json({ error: 'technicien and raison_transfert must not be empty' });
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        technicien: technicien,
        raison_transfert: raison_transfert,
        type: 'FIELD',
        status: 'ASSIGNED'
      },
      { new: true }
    );

    const notification = await Notification.create({
      receiverId: technicien,
      message: `Nouveau ticket`,
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { service_type, reference, service_station, call_time } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        service_type,
        reference,
        service_station,
        call_time: call_time || "",
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
/////////////////////////////////////////// CHANGING TICKET STATUS ///////////////////////////////////////////////
const AcceptTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        accepting_time: new Date(),
        status: 'ACCEPTED'
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//////////////////////////////////////////// APPROVE /////////////////////////////////////////////////////
const ApprovedTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: 'APPROVED',
        completion_time : new Date ()
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
/////////////////////////////////////////// START ////////////////////////////////////////////////////////////
const StartTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: 'LOADING',
        starting_time : new Date ()
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
///////////////////////////////////// Report ////////////////////////////////////////////////////////////
const ReportTicket = async (req, res) => {
  const { ticketId } = req.params;
  const note = req.body.note; 

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: 'REPORTED',
        reporting_time : new Date (),
        note: note,
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
/////////////////////////////////////////// Solve ////////////////////////////////////////////////////////////
const SolveTicket = async (req, res) => {
  const { ticketId } = req.params;
  const solution = req.body.solution; 

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: 'SOLVED',
        solving_time : new Date (),
        solution: solution,
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
///////////////////////////////////////////APPROVED ------> SOLVED ////////////////////////////////////////////
const ResetToSolved = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: 'SOLVED',
        solving_time:new Date(),
        completion_time: null,
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TECHNICIEN GET PHONE //
const getAssignedPhoneTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ type: 'PHONE', technicien: Id })
    .populate({
      path: 'client',
      select: 'client',
    })
    .populate({
      path: 'contact',
      select: 'name',
    })
    .populate({
      path: 'equipement',
      select: 'equipement_sn',
    })
    /*.populate({
      path: 'technicien',
      select: 'firstname lastname email',
    });*/
;
    
    if (!tickets) {
      return res.status(404).json({ error: 'No tickets found' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching assigned phone tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// TECHNICIEN GET FIELD //
const getAssignedFieldTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ type: 'FIELD', technicien: Id })
    .populate({
      path: 'client',
      select: 'client',
    })
    .populate({
      path: 'contact',
      select: 'name',
    })
    .populate({
      path: 'equipement',
      select: 'equipement_sn ',
    })
    /*.populate({
      path: 'technicien',
      select: 'firstname lastname email',
    });*/
;
    
    if (!tickets) {
      return res.status(404).json({ error: 'No tickets found' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching assigned phone tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAssignedTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ status: 'APPROVED', technicien: Id })   
     .sort({ createdAt: -1 })
    .populate({
      path: 'client',
      select: 'client',
    })
    .populate({
      path: 'contact',
      select: 'name',
    })
    .populate({
      path: 'equipement',
      select: 'equipement_sn',
    })
    /*.populate({
      path: 'technicien',
      select: 'firstname lastname email',
    });*/
;
    
    if (!tickets) {
      return res.status(404).json({ error: 'No tickets found' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching assigned phone tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const countTickets = async (req, res) => {
  try {
    let count = await Ticket.countDocuments();
    count = count || 0;
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getTicketsByDay = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const allDays = [];
    let currentDay = new Date(startOfMonth);

    while (currentDay <= endOfMonth) {
      allDays.push({
        day: currentDay.toISOString().split('T')[0],
        count: 0,
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    const reclamationsByDay = await Ticket.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    reclamationsByDay.forEach((ticket) => {
      const dayObj = allDays.find((day) => day.day === ticket._id);
      if (dayObj) {
        dayObj.count = ticket.count;
      }
    });

    res.status(200).json(allDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReclamationsByDay = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const allDays = [];
    let currentDay = new Date(startOfMonth);

    while (currentDay <= endOfMonth) {
      allDays.push({
        day: currentDay.toISOString().split('T')[0],
        count: 0,
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    const reclamationsByDay = await Ticket.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    reclamationsByDay.forEach((reclamation) => {
      const dayObj = allDays.find((day) => day.day === reclamation._id);
      if (dayObj) {
        dayObj.count = reclamation.count;
      }
    });

    res.status(200).json(allDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*
const getTicketsByDay = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const ticketsByDay = await Ticket.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    return ticketsByDay;
  } catch (error) {
    throw new Error(`Error fetching tickets by day: ${error.message}`);
  }
};

*/

module.exports = {
  getReclamationsByDay,
  getTicketsByDay,
  countTickets,
  getAssignedTickets,
  getAssignedFieldTickets,
  getAssignedPhoneTickets,
  ResetToSolved,
  ApprovedTicket,
  updateTicket,
  deleteTicket,
  solvingTicketbyCoordinatrice,
  getPhoneTickets,
  addPhoneTicket,
  getTicketById,
  getAllTickets,
  transferTicket,
  getFieldTickets,
  solvedTicket,
  AcceptTicket,
  StartTicket,
  SolveTicket,
  ReportTicket,
};
