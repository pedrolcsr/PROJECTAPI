//import express, { Request, Response } from "express";

import express from "express";
import type { Request, Response } from "express";



const router =express.Router()



router.get("/", (req: Request, res: Response)=>{
        res.send("Hello World! tela de login")
})


export default router