const db = require("../../../config");

const route = async (req, res, next) => {
    try {
        let all_id = [];
        let listUser = [];
        let a = [];
        await db.collection("users").get().then(i => i.forEach(d => all_id.push(d.id)));
        for (let i = 0; i < all_id.length; i++) {
            listUser.push(await db.collection("users").doc(all_id[i]).collection("orders").get());
        }
        listUser.forEach(i => i.forEach(d => a.push(d.data())));
        if(a.length !== 0)
            return res.status(200).send({ status: true , data: a })
    } catch (error) {
        return res.status(500).send({ status: false, message: `${error.code} - ${error.message}` })
    }
};
module.exports = route;