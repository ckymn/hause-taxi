const db = require("../../../config");

const route = async (req, res, next) => {
    try {
        const data = req.body;
        const { email } = req.body;
        const _user = await db.collection("users").where("email", "==", email).get();
        if (_user.size === 1)
            return res.status(500).send({ status: false, message: "We have already this email" })
        await db.collection('users').doc().set({
            ...data,
            role: "false",
            resetLink: ''
        });
        return res.status(200).send({ status: true, message: "Created a new user" });
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};

module.exports = route;