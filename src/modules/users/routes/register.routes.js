const { Router } = require("express");
const {
    addClient,
    getClient,
    changeStatusClient,
    getInstrument,
    // joinToOrganization,
    // addAccountUser,
} = require("../controllers/registro.controller.js");
const { validateJWT } = require("../../../common/middlewares/validate-jwt.js");
const router = Router();
router.get("/", getClient);
router.post("/client", addClient); // crear registro
router.get("/instrument", getInstrument)  // Obtener instrumento
router.put("/estatus/:id_cliente", changeStatusClient);
module.exports = router;
