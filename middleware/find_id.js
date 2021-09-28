require('dotenv').config();
const jwt = require("jsonwebtoken");

const route = async (req, res, next) => {
    let auth = req.header('Authorization');
    if (!auth)
        return res.status(401).send("Unauthorized_1")
    auth = auth.split(" ")[1];
    if (!auth)
        return res.status(401).send(`Unauthorized_2`);
    let { _id , o_id } = await jwt.verify(auth, process.env.TOKEN_KEY);
    if (!_id && !o_id)
        return res.status(401).send(`Unauthorized_3`);
    if (_id) {
        req._client = _id;
        return next();
    }
    if(o_id){
        req.o_client = o_id;
        return next();
    }
    return res.status(401).send({ message: "Unauthorized_4" })
}
module.exports = route;