const { Router } = require("express");
const {
    addClient,
    getClient,
    // changeStatusAccountUser,
    // joinToOrganization,
    // addAccountUser,
} = require("../controllers/registro.controller.js");
const { validateJWT } = require("../../../common/middlewares/validate-jwt.js");
const router = Router();
router.get("/", getClient);
router.post("/client", addClient); // crear registro
// router.post("/account", addAccountUser);
// router.post("/join", [validateJWT], joinToOrganization);
// router.put("/status", [validateJWT], changeStatusAccountUser);
module.exports = router;
