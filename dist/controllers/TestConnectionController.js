//import express, { Request, Response } from "express";
import express from "express";
const router = express.Router();
router.get("/test-connection", (req, res) => {
    res.status(200).json({
        messagem: "Conexão com API realizada com sucesso!"
    });
});
export default router;
//# sourceMappingURL=TestConnectionController.js.map