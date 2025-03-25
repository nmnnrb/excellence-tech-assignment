// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(403).json({ message: 'Access Denied' });
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid Token' });
//     }
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the correct secret
        req.user = decoded; // Attach user payload to request
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token" });
    }
};
