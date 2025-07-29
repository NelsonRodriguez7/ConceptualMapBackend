const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/authMiddleware');

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  
  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json(
        { status: 
            {
                code: 'API4004', 
                description: 'Error al consultar usuario'
            } 
        });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json(
        { status: 
            {
                code: '4001', 
                description: 'Error al comparar usuario'
            } 
        });

    const token = generateToken(user);
    res.status(200).json({ 
            body: {
                token, 
                user: 
                    { 
                        email: user.email, 
                        phone: user.phone 
                    } 
            },
            status: {
                code: 'API0000',
                description: 'Success'
            }
        });
  } catch (err) {
    res.status(500).json(
        { status: 
            {
                code: 'API5000', 
                description: err.message 
            }
        });
  }
};

module.exports = { loginUser };
