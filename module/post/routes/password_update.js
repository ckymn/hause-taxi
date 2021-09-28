const db = require("../../../config");

const router = async (req, res, next) => {
    try {
        const { _client } = req;
        const { old_password, newPassword, newPasswordAgain } = req.body;
        let _user = await db.collection("users").doc(_client).get().then(doc => doc.data());

        if (_user.password !== old_password)
            return res.status(404).send({ status: false, message: "Old_password does not match" })
        if (newPassword !== newPasswordAgain)
            return res.status(404).send({ status: false, message: "New_password and New_password_again does not match" })
        await db.collection("users").doc(_client).update({ password: newPassword })
        return res.status(200).send({ status: true, message: "Password Update is success" })
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = router;
