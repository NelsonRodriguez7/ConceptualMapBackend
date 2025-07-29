const User = require('../models/userModels');


const registerUser = async (req, res) => {
  try {
    const { email, userName, password, phone } = req.body;
    
    if (!email || !userName || !password) {
      return res.status(400).json({ 
        status: {
            code: 'API4001',
            description: 'Faltan campos'
        } 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        status: {
            code: 'API4002',
            description: 'Usuario existente'
        }
      });
    }

    
    const newUser = new User({ email, userName, password, phone });
    await newUser.save();

    res.status(201).json({ 
        body: {
          userCreated: true
        },
        status: {
            code: 'API0000',
            description: 'Success'
        } 
    });
  } catch (error) {
    console.error('Error en registerUser:', error);
    res.status(500).json({ 
        status: {
            code: 'API4004', 
            description: 'Fallo el registro'} 
    });
  }
};

module.exports = {
  registerUser,
};