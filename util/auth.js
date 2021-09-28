require("dotenv").config();
const jwt = require("jsonwebtoken");

const Token = {};

Token.encode = (object) => {
    let {sign="non_prod_key"} = process.env;
    return jwt.sign(object,sign);
};

Token.decode = (token) => {
    try {
        let {sign="non_prod_key"} = process.env;
        const decode = jwt.verify(token,sign);
        if(decode._id == null)
            return false;
        return decode;
    } catch (error) {
        return false;
    }
};

module.exports = Token;