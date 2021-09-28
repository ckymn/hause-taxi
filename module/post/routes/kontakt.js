const db = require("../../../config");
const sendEmail = require("../../../util/sendEmail");

const router = async (req, res, next) => {

    const data = req.body;
    const { email, sms } = req.body;
    const { _client, o_client } = req;
    if (_client) {
        let _sms = await sendEmail(email, "Haustaxi", sms);
        if (_sms) {
            console.log(_sms);
            if (_sms.code === "ESOCKET")
                return res.status(500).send({ status: false, message: "ESOCKET" })
        }
        await db.collection("users").doc(_client).collection("kontakt").doc().set({
            ...data,
            time: new Date().getTime().toString()
        });
        return res.status(200).send({ status: true, message:"kontakt info is success"})
    }
    if (o_client)
        return res.status(400).send({ status: false, message: "You Should Register." })
};
module.exports = router;
