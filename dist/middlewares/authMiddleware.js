import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({
            message: "Token invalido ou expirado!",
        });
        return;
    }
    const [bearer, token] = authHeader.split(" ");
    if (!token || bearer?.toLocaleLowerCase() !== "bearer") {
        res.status(401).json({
            message: "Token invalido!",
        });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Token invalido ou expirado!",
        });
        return;
    }
}
//# sourceMappingURL=authMiddleware.js.map