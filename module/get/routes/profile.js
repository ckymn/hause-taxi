const db = require("../../../config");

const route = async (req, res) => {
    try {
        const { _client, o_client } = req;
        let _profile = []
        if (_client) {
            let doc = await db.collection("users").doc(_client).get().then(i => {
                return i.data();
            });
            return res.status(200).send({ status: true, data: doc })
        }
        if (o_client) {
            let o_doc = await db.collection("other_users").get().then(i => {
                return i.data();
            });
            return res.status(200).send({ status: true, data: o_doc })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
    res.send('login')
};
module.exports = route;