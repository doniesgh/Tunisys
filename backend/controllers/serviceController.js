const Contrat = require('../models/contrat');
const Service = require('../models/service');
const Equipement = require('../models/equipement');
const Client = require('../models/client');

const mongoose = require('mongoose');
const addService = async (req, res) => {
  try {
    const { service_no, effective_date, termination_date, model, quantity, equipement, contrat, client, working_hour_start,
      working_hour_end,
      response_time_critical,
      response_time_major,
      response_time_minor
    } = req.body;
    let emptyFields = [];
    if (!service_no) {
      emptyFields.push("service_no");
    }
    if (!effective_date) {
      emptyFields.push("effective_date");
    }
  
    if (!termination_date) {
      emptyFields.push("termination_date");
    }
  
    if (!model) {
      emptyFields.push("model");
    }
  
    if (!client) {
      emptyFields.push("client");
    }
  
    if (!quantity) {
      emptyFields.push("quantity");
    }
  
    if (!equipement) {
      emptyFields.push("equipement");
    }
    if (!contrat) {
      emptyFields.push("contrat");
    }
  
    if (!client) {
      emptyFields.push("client");
    }
    if (!quantity) {
      emptyFields.push("quantity");
    }
  
    if (!working_hour_start) {
      emptyFields.push("working_hour_start");
    }

    if (!working_hour_end) {
      emptyFields.push("working_hour_end");
    }
  
    if (!response_time_critical) {
      emptyFields.push("response_time_critical");
    }
     
    if (!response_time_major) {
      emptyFields.push("response_time_major");
    }
     
    if (!response_time_minor) {
      emptyFields.push("response_time_minor");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Veuillez remplir tous les champs.", emptyFields });
    }

    console.log('Received data:', req.body);

    if (!service_no || !quantity || !equipement || !contrat || !model || !effective_date || !termination_date || !client
      || !working_hour_start
      || !working_hour_end
      || !response_time_critical
      || !response_time_major
      || !response_time_minor) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const equipementExists = await Equipement.findById(equipement);

    if (!equipementExists) {
      return res.status(404).json({ error: 'Equipement not found' });
    }
    const clientExists = await Client.findById(client);

    if (!clientExists) {
      return res.status(404).json({ error: 'client not found' });
    }
    const contratExists = await Contrat.findById(contrat);

    if (!contratExists) {
      return res.status(404).json({ error: 'Contrat not found' });
    }

    const newService = new Service({
      service_no,
      working_hour_start,
      working_hour_end,
      response_time_critical,
      response_time_major,
      response_time_minor,
      effective_date,
      termination_date,
      model,
      quantity,
      contrat: contratExists._id,
      equipement: equipementExists._id,
      client: clientExists._id
    });

    const savedService = await newService.save();

    contratExists.service = contratExists.service || [];
    equipementExists.service = equipementExists.service || [];

    if (Array.isArray(contratExists.service)) {
      contratExists.service.push(savedService._id);
      await contratExists.save();
    } else {
      console.error('contratExists.services is not an array:', contratExists.service);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (Array.isArray(equipementExists.service)) {
      equipementExists.service.push(savedService._id);
      await equipementExists.save();
    } else {
      console.error('equipementExists.service is not an array:', equipementExists.service);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (Array.isArray(clientExists.service)) {
      clientExists.service.push(savedService._id);
      await clientExists.save();
    } else {
      console.error('clientExists.service is not an array:', equipementExists.service);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const response = {
      service: savedService,
      contrat: contratExists._id,
      equipement: equipementExists._id,
      client: clientExists._id,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation failed', errors: validationErrors });
    }

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: 'Service_no must be unique' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



const fetchServices = async (req, res) => {
  try {

    const services = await Service.find()
      .populate({
        path: 'equipement',
        select: 'equipement_sn', // Include only these fields
      }).populate({
        path: 'contrat',
        select: 'contrat_sn', // Include only these fields
      });

    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const fetchServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId)
      .populate({
        path: 'equipement',
        select: 'equipement_sn', // Include only these fields
      })
      .populate({
        path: 'contrat',
        select: 'contrat_sn', // Include only these fields
      });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific service by ID
const getServiceById = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error getting service by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a service by ID
const deleteServiceById = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(deletedService);
  } catch (error) {
    console.error('Error deleting service by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  fetchServices,
  addService,
  getAllServices,
  getServiceById,
  deleteServiceById,
  fetchServiceById
};
