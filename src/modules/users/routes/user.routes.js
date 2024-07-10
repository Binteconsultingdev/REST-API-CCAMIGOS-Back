const { Router } = require("express");
const {
  addUser,
  getUsers,
  changeStatusAccountUser,
  joinToOrganization,
  addAccountUser,
} = require("../controllers/user.controller.js");
const { validateJWT } = require("../../../common/middlewares/validate-jwt.js");
const router = Router();
router.get("/:id_organization", [validateJWT], getUsers);
router.post("/", addUser); // crear usuario
router.post("/account", addAccountUser);
router.post("/join", [validateJWT], joinToOrganization);
router.put("/status", [validateJWT], changeStatusAccountUser);
module.exports = router;
