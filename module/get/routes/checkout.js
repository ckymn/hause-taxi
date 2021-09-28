const db = require("../../../config");

const router = async (req, res, next) => {
    try {
        const { _client , o_client } = req;
        const times = [];
        if (_client) {
            let order = await db.collection("users").doc(_client).collection("orders").get();
            order.forEach(d => times.push(d.get("time")));
            let userTime = times.sort().pop()
            const result = await db.collection("users").doc(_client).collection("orders").where("time", "==", userTime).get();
            result.forEach(doc => {
                return res.status(200).send({ status: true, data: doc.data() })
            })
        }
        if(o_client){
            await db.collection("other_users").doc(o_client).collection("orders").where("o_id","==",o_client).get().then(i => {
                i.forEach(doc => {
                    return res.status(200).send({ status: true, data: doc.data()})
                });
            })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = router;
