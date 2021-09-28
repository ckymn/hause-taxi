const db = require("../../../config");

const router = async (req, res, next) => {
    try {
        const data = req.body;
        const { _client, o_client } = req;
        if (_client) {
            await db.collection("users").doc(_client).collection("orders").doc().set({
                ...data,
                time: new Date().getTime().toString()
            });
        }
        if (o_client) {
            await db.collection("other_users").doc(o_client).collection("orders").doc().set({
                ...data,
                time: new Date().getTime().toString(),
                o_id: o_client
            })
        }
        return res.status(200).send({ status: true, message: "zum_flughafen booking is success" })
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = router;
