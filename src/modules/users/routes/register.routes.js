const { Router } = require("express");
const {
    addClient,
    getClient,
    changeStatusClient,
    // joinToOrganization,
    // addAccountUser,
} = require("../controllers/registro.controller.js");
const { validateJWT } = require("../../../common/middlewares/validate-jwt.js");
const router = Router();
router.get("/", getClient);
router.post("/client", addClient); // crear registro
// router.post("/account", addAccountUser);
// router.post("/join", [validateJWT], joinToOrganization);
router.put("/estatus", changeStatusClient);
module.exports = router;
