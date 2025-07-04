// authMiddleware.js

const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar o token JWT enviado no header da requisição.
 */
const verifyToken = (req, res, next) => {
    // Pega o token do header 'Authorization', que vem no formato "Bearer <TOKEN>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Nenhum token foi fornecido.' });
    }

    // Verifica se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado.' });
        }
        // Se for válido, adiciona os dados do usuário (payload) ao objeto `req`
        req.user = decodedPayload;
        next(); // Continua para a próxima função (a rota em si)
    });
};

/**
 * Middleware para verificar se o usuário autenticado tem a permissão de 'admin'.
 * IMPORTANTE: Este middleware deve sempre ser usado DEPOIS do `verifyToken`.
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // O usuário é admin, pode prosseguir
    } else {
        return res.status(403).json({ error: 'Acesso negado. Requer privilégios de administrador.' });
    }
};

module.exports = {
    verifyToken,
    isAdmin
};