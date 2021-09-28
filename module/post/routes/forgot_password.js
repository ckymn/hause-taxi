const db = require("../../../config");
const jwt = require("jsonwebtoken");
const sendEmail_passwordReset = require("../../../util/sendEmail_passwordRest");

const router = async (req, res, next) => {
    try {
        const { email } = req.body;
        let _user = [];
        await db.collection("users").where("email", "==", email).get().then(i => i.forEach(doc => _user.push(doc.data(), doc.id)));
        if(_user.length === 0)
            return res.status(400).send({ status: false, message: "User with this email does not exists"});
        const token = jwt.sign({_id: _user[1]}, process.env.RESET_PASSWORD_KEY, { expiresIn: '5m'});
        await sendEmail_passwordReset(email, "Password Reset Code", `Klicken Sie hier, um Ihr Passwort zurückzusetzen`, `<p><a href="http://${req.headers.host}/reset_password/${token}">PASSWORT ZURÜCKSETZEN</a></p>`);
        await db.collection("users").doc(_user[1]).update({ resetLink: token })
        return res.status(200).send({ status: true, message: "Sms send is success", data: token})
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = router;
