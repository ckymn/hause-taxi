const express = require("express");
const router = express.Router();

const post = require("./module/post/routes");
const get = require("./module/get/routes");
const { isAuthenticated, findID } = require("./middleware/index");

router.get(`/brunncard`, get.brunncard);
router.get(`/datenschutzerklaerung`, get.datenschutzerklaerung);
router.get(`/flughafen-transfer-moedling-austria`, get.flughafen_transfer_moedling_austria);
router.get(`/`, get.home)
router.get(`/impressum`, get.impressum);
router.get(`/kontakt`, get.kontakt);
router.get(`/laxenburg-karte`, get.laxenburg_karte);
router.get(`/laxenburgkarte`, get.laxenburgkarte);
router.get(`/preise`, get.preise)
router.get(`/register`, get.register)
router.get(`/taxi-flotte`, get.taxi_flotte);
router.get(`/unser-service/`, get.unser_service);
router.get(`/wiener-neudorf-card`, get.wiener_neudorf_card);
router.get(`/checkout/`, findID, get.checkout);
router.get(`/login`, get.login);
router.get(`/admin`, isAuthenticated, get.admin);
router.get(`/profile`, findID, get.profile);

router.post(`/checkout`, findID, post.checkout);
router.post(`/kontakt`, findID, post.kontakt)
router.post(`/register`, post.register);
router.post(`/login`, post.login);
router.post(`/online-taxi-bestellen`, findID, post.a_b_taxi_bestellen);
router.post(`/zum-flughafen`, findID, post.zum_flughafen);
router.post(`/vom-flughafen`, findID, post.vom_flughafen);
router.post(`/password-update`, findID, post.password_update);
router.post(`/forgot_password`, post.forgot_password);
router.post(`/reset_password`, post.reset_password);



module.exports = router;