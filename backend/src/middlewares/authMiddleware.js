// authMiddleware.js

import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token
        const decoded = jwt.verify(token, 'secret');
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default authenticateUser;
