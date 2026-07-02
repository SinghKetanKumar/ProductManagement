const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (email, password) => {

    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
        email,
        password: hashedPassword
    });
};

const loginUser = async (email, password) => {

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error("Invalid Email");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        token,
        user
    };
};

module.exports = {
    registerUser,
    loginUser
};