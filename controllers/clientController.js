const Client = require('../models/clientModel');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createClient = async (req, res) => {
    try {
        const client = new Client({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: {
                streetNumber: req.body.address.streetNumber,
                streetName: req.body.address.streetName,
                city: req.body.address.city,
                postalCode: req.body.address.postalCode,
            },
        });
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        client.name = req.body.name;
        client.email = req.body.email;
        client.phone = req.body.phone;
        client.address = req.body.address;
        const updatedClient = await client.save();
        res.status(200).json(updatedClient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      await Client.removeById(req.params.id);
      res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
