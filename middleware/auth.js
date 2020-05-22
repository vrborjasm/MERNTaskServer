const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no valido'})
    }

    try {
        const valid = jwt.verify(token, process.env.SIGNATURE);
        req.user = valid.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'});
    }
}