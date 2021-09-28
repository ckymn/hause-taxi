require('dotenv').config();
const express = require('express');
const cors = require("cors");
const router = require("./router");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
