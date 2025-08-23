const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      error: 'Token não fornecido',
      message: 'É necessário estar autenticado para acessar este recurso' 
    });
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    return res.status(401).json({ 
      error: 'Token mal formatado',
      message: 'Formato esperado: Bearer [token]' 
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ 
      error: 'Token mal formatado',
      message: 'Formato esperado: Bearer [token]' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userType = decoded.type;
    return next();
  } catch (err) {
    return res.status(401).json({ 
      error: 'Token inválido',
      message: 'Token expirado ou inválido' 
    });
  }
};

module.exports = authMiddleware;
