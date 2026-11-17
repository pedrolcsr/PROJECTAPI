import type { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        id: number;
    };
}
export declare function verifyToken(req: AuthRequest, res: Response, next: NextFunction): void;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map