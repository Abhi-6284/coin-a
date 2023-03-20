const root = require('../GraphQL/resolver.Graphql');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

exports.getLogout = async (req, res, next) => {
    req.session = null // Deletes the cookie.
    req.session.destroy // Deletes the session in the database.
}
exports.getUsers = async (req, res, next) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.sendStatus(403).json({ message: "Token Expired..." });
        }
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userDetails = await root.getUserById({id:data.id});
            return res.status(201).json({ userDetail: userDetails })
        } catch {
            return res.sendStatus(403);
        }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

exports.postLogin = async (req, res) => {
    try {
        const userData = await root.getUserByPara({ email: req.body.email });
        if (!userData) { throw new Error("No User found!.."); } else {
            const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
            if (await bcrypt.compare(req.body.password, userData.password)) {
                console.log(token);
                req.session.token = token;
                console.log(req.session);
                return res.cookie("access_token", token).status(201).json({ message: "Logged in successfully 😊 👌" })

            } else { throw new Error("Invalid Password"); }
        }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

exports.postRegister = async (req, res) => {
    try {
        if (req.body.password == req.body.confirmPassword) {
            const userData = await root.getUserByPara({ email: req.body.email });
            if (!userData) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const created = await root.createUser({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hashedPassword });
                const userDetail = await root.getUserByPara({ email: req.body.email });
                if (created) {
                    return res.status(200).json({ message: "Registered successfully 😊 👌\nYou are Welcome " + userDetail.firstName + " " + userDetail.lastName })
                }
            } else { throw new Error("You are existing Users " + userData.email); }
        } else { throw new Error("Your Passwords are not Match"); }
    } catch (e) { return res.status(401).json({ message: e.message }) }
}

