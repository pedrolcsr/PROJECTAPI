//import express, { Request, Response } from "express";

import express from "express";
import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

import { AppDataSource } from "../data-source.js";
import { User } from "../entity/Users.js";
import * as yup from 'yup';
import crypto from "crypto";
import { Situation } from "../entity/Situations.js";





const router = express.Router()



router.post("/", async (req: Request, res: Response) => {
        try {
                const { email, password } = req.body;

                if (!email || !password) {
                        res.status(400).json({
                                message: "Email e senha são obrigatorios!"
                        });
                        return;
                }

                const authService = new AuthService();

                const userData = await authService.login(email, password)

                res.status(200).json({
                        message: "Login realizado com sucesso!",
                        user: userData
                });
                return;



        } catch (error: any) {

                res.status(401).json({
                        message: "Erro ao realizar login",
                });
                return;

        }

});


router.post("/recover-password", async (req: Request, res: Response) => {

        try {

                var data = req.body;

                const schema = yup.object().shape({

                        urlRecoverPassword: yup.string().required("A URL é obrigatória!"),
                        email: yup.string().email("O campo email deve ser um email válido.").required("O campo email é obrigatório."),


                });

                await schema.validate(data, { abortEarly: false });

                const userRepository = AppDataSource.getRepository(User);

                const user = await userRepository.findOneBy({ email: data.email });

                if (!user) {
                        res.status(404).json({
                                messagem: "Usuario não encontrado!",
                        });
                        return;
                }

                user.recoverPassword =crypto.randomBytes(32).toString("hex");

                await userRepository.save(user);

                res.status(200).json({
                        message: "Gerado o link para recuperação de senha!",
                        urlRecoverPassword: `${data.urlRecoverPassword}?email=${data.email}&key=${user.recoverPassword}`,
                        key: user.recoverPassword,
                        
                });




        } catch (error) {

                if (error instanceof yup.ValidationError) {

                        res.status(400).json({
                                messagem: error.errors
                        });
                        return;
                }

                res.status(500).json({
                        messagem: "Erro ao atualizar senha do usuário."
                });



        }

});


export default router