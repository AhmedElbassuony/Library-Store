import jwt from 'jsonwebtoken';
import { createJSONResponse } from '../index.js';

const authenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json(createJSONResponse(false, 'No token provided'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json(createJSONResponse(false, 'Failed to authenticate token'));
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    });
}

const admin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json(createJSONResponse(false, 'Access denied: Admins only'));
    }
    next();
}

const hasAccess = (req, res, next) => {
    if (req.role !== 'admin' && req.userId !== req.params.id) {
        return res.status(401).json(createJSONResponse(false, 'Unauthorized access'));
    }
    next();
}

export { authenticated, admin, hasAccess };