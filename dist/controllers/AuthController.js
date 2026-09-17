//import express, { Request, Response } from "express";
import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
    res.send("Hello World! tela de login");
});
export default router;
//# sourceMappingURL=AuthController.js.map