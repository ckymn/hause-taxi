const jwt= require("jsonwebtoken");
const db = require("../../../config");

const router = async (req, res, next) => {
    try {
        const { newPassword, newPasswordAgain } = req.body;
        console.log(req.params);
        let decode = jwt.verify(req.params.token, process.env.RESET_PASSWORD_KEY)
        if(!decode)
            return res.status(401).send({ status: false, message: "Incorrect token or It is expired"});
        if(newPassword !== newPasswordAgain)
            return res.status(500).send({ status: false, message: "Both passwords don't match"});
        await db.collection("users").doc(decode._id).update({ password: newPassword})
        return res.status(200).send({ status: true , message: "Password Reset is success" })
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = router;
