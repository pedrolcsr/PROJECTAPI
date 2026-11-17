//import express, { Request, Response } from "express";
import express from "express";
import { AuthService } from "../services/AuthService.js";
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Email e senha são obrigatorios!"
            });
            return;
        }
        const authService = new AuthService();
        const userData = await authService.login(email, password);
        res.status(200).json({
            message: "Login realizado com sucesso!",
            user: userData
        });
        return;
    }
    catch (error) {
        res.status(401).json({
            message: "Erro ao realizar login",
        });
        return;
    }
});
export default router;
//# sourceMappingURL=AuthController.js.map