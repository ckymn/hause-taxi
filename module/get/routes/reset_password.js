const db = require("../../../config");

const router = async (req,res,next) => {
	try {
		const { params } = req;
		let _user = [];
		await db.collection("users").where("resetLink", "==", params.token).get().then(i => i.forEach(doc => _user.push(doc.data())))
		if(_user.length === 0)
			return res.status(404).send({ status: false, message: "Password reset token is invalid or has expired"})
		return res.status(200).send({ status: true, token: req.params.token})
	} catch (error) {
		
	}
};

module.exports = router;