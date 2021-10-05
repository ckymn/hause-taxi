const db = require("../../../config");
const sendSms = require("../../../util/sendSms");
const sendEmail_checkout = require("../../../util/sendEmail_checkout");
const sendSms_santral = require("../../../util/sendSms_santral");

const router = async (req, res, next) => {
    try {
        const data = req.body;
        const { phone, email } = req.body;
        const { _client, o_client } = req;
        const invoice = [];
        if (_client) {
            // booking save
            await db.collection("users").doc(_client).collection("checkout").doc().set({
                ...data,
                time: new Date().getTime().toString()
            });
            // order get
            let times_order = [];
            let order = await db.collection("users").doc(_client).collection("orders").get();
            order.forEach(d => times_order.push(d.get("time")));
            let userTime1 = times_order.sort().pop()
            const result1 = await db.collection("users").doc(_client).collection("orders").where("time", "==", userTime1).get();
            result1.forEach(i => {
                invoice.push(i.data())
            })
            // checkout get
            let times_checkout = [];
            let checkout = await db.collection("users").doc(_client).collection("checkout").get();
            checkout.forEach(d => times_checkout.push(d.get("time")));
            let userTime2 = times_checkout.sort().pop();
            const result2 = await db.collection("users").doc(_client).collection("checkout").where("time", "==", userTime2).get();
            result2.forEach(i => {
                invoice.push(i.data());
            })

        }
        if (o_client) {
            // booking save
            await db.collection("other_users").doc(o_client).collection("checkout").doc().set({
                ...data,
                time: new Date().getTime().toString(),
                o_id: o_client
            });
            // order get
            await db.collection("other_users").doc(o_client).collection("orders").where("o_id", "==", o_client).get().then(doc => {
                doc.forEach(i => invoice.push(i.data()));
            });
            // checkout get
            await db.collection("other_users").doc(o_client).collection("checkout").where("o_id", "==", o_client).get().then(doc => {
                doc.forEach(i => invoice.push(i.data()));
            });
        }
        // await sendSms(phone, invoice);
        // await sendSms_santral(phone,invoice)
        await sendEmail_checkout(email, `Deine Bestellung bei ${invoice[0].aim}-${invoice[0].arrival} Haustaxi vom ${Date(Date.now().toString())} wurde fertiggestellt`,
            [
                invoice[0], invoice[1]
            ]);
        return res.status(200).send({ status: true, message: " Save chekcout info is success." });
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = router;
