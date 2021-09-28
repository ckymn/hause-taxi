require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../config");

const route = async (req, res, next) => {
    let auth = req.header('Authorization');
    if (!auth)
        return res.status(401).send(`Unauthorized_1`);
    auth = auth.split(" ")[1];
    if (!auth)
        return res.status(401).send(`Unauthorized_2`);
    let { _id } = await jwt.verify(auth, process.env.TOKEN_KEY);
    if (!_id)
        return res.staus(401).send({ message: "Unauthorized_3" })
    const _user = await db.collection("users").doc(_id).get();
    const go = await _user.data().role;
    if(go) 
        return next();
}
module.exports = route;