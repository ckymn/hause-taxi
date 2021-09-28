require('dotenv').config();
const db = require("../../../config");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const route = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let o_id = uuidv4();
        const arr = [];

        if (email || password) {
            const _user = await db.collection("users").where("email", "==", email).where("password", "==", password).get();
            _user.forEach(doc => arr.push(doc.id));
            if (_user.size !== 1)
                return res.status(400).send({ status: false, message: 'Kullanici Bulunamadi ..' })
            else {
                let access_token = jwt.sign({ _id: arr[0] }, process.env.TOKEN_KEY, { expiresIn: '2h'})
                return res.status(200).send({ status: true, token: access_token });
            }
        }
        if (!email || !password) {
            let access_token = jwt.sign({ o_id: o_id }, process.env.TOKEN_KEY, { expiresIn: '2h'});
            return res.status(200).send({ status: true, token: access_token });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};

module.exports = route;