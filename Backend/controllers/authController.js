const authService = require("../services/authService");

// Register User
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authService.registerUser(email, password);

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        res.status(200).json({
            message: "Login Successful",
            token: result.token,
            user: {
                id: result.user.id,
                email: result.user.email
            }
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// Export functions
module.exports = {
    register,
    login
};