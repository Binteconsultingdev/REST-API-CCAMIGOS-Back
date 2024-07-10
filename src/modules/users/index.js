const express = require("express");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const skillRoutes = require("./routes/skill.routes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
// router.use("/skills", skillRoutes);
// Agrega aquí todas tus rutas combinadas

module.exports = router;
