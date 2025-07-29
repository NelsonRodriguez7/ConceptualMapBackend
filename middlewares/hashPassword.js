const bcrypt = require('bcrypt');

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ status: {
        code: 'API4001',
        description: 'Faltan datos'
        } 
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    req.body.password = hashedPassword;

    next();
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    res.status(500).json({ status: {
        code: 'API4004',
        description: 'Fallo al guardar'
      } 
    });
  }
};

module.exports = hashPassword;
