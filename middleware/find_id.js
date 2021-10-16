require('dotenv').config();
const jwt = require("jsonwebtoken");

const route = async (req, res, next) => {
    let auth = req.header('Authorization');
    if (!auth)
        return res.sendStatus(401).send({ status: false, message: "Unauthorized_1" })
    auth = auth.split(" ")[1];
    if (!auth)
        return res.sendStatus(401).send({ status: false, message: `Unauthorized_2` });
    await jwt.verify(auth, process.env.TOKEN_KEY, (err, user) => {
        if (err)
            return res.status(403).send({ status: false, message: "Unauthorized_3" });
        if (!user._id)
            return res.status(401).send({ status: false, message: `Unauthorized_3_id` });
        if (user._id) {
            req._client = user._id;
            return next();
        }
        if (!user.o_id)
            return res.status(401).send({ status: false, message: `Unauthorized_3_o_id` })
        if (user.o_id) {
            req.o_client = user.o_id;
            return next();
        }
    });


}
module.exports = route;
