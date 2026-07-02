const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    console.log("===== AUTH MIDDLEWARE =====");
    console.log("Authorization Header:", req.headers.authorization);
    console.log("JWT Secret Loaded:", process.env.JWT_SECRET);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No Authorization Header");
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    console.log("Received Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        req.user = decoded;
        next();

    } catch (err) {

        console.log("JWT Verify Error:", err.message);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};