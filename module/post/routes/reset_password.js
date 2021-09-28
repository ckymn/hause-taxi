const jwt= require("jsonwebtoken");
const db = require("../../../config");

const router = async (req, res, next) => {
    try {
        const { resetLink, newPassword } = req.body;
        let decode = jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY)
        console.log(decode);
        if(!decode)
            res.status(401).send({ status: false, message: "Incorrect token or It is expired"});
        await db.collection("users").doc(decode._id).update({ password: newPassword})
        return res.status(200).send({ status: true , message: "Password Reset is success" })
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = router;
