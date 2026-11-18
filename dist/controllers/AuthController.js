//import express, { Request, Response } from "express";
import express from "express";
import { AuthService } from "../services/AuthService.js";
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/Users.js";
import * as yup from 'yup';
import crypto from "crypto";
import { Situation } from "../entity/Situations.js";
import nodemailer from "nodemailer";
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
router.post("/recover-password", async (req, res) => {
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
        user.recoverPassword = crypto.randomBytes(32).toString("hex");
        await userRepository.save(user);
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        var message_content = {
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: "Recupera Senha!",
            text: `Prezando(a) ${user.name} \n\n
                        Informamos que a sua solicitação de senha foi recebida com sucesso. \n\n
                        Clique ou copie o link para criar uma nova senha em nosso sistema:
                        ${data.urlRecoverPassword}?email=${data.email}&key=${user.recoverPassword}\n\n
                        Esta mensagem foi enviada a voce pela empresa ${process.env.APP}.\n\n
                        Voce esta recebendo porque esta cadastrado no bando de dados da empresa ${process.env.APP}.
                        Nenhum email enviado pela ${process.env.APP} tem arquivos anexados ou solicita o preenchimento de senhas
                        e informações cadastrais. \n\n `,
            html: `Prezado(a) ${user.name}, <br><br>
Informamos que a sua solicitação de alteração de senha foi recebida com sucesso. <br><br>
Clique no link abaixo para criar uma nova senha em nosso sistema: <br><br>

<a href="${data.urlRecoverPassword}?email=${data.email}&key=${user.recoverPassword}">
    ${data.urlRecoverPassword}?email=${data.email}&key=${user.recoverPassword}
</a>

<br><br>
Esta mensagem foi enviada a você pela empresa ${process.env.APP}. <br><br>
Você está recebendo este e-mail porque está cadastrado no banco de dados da empresa ${process.env.APP}. <br><br>
Nenhum e-mail enviado pela empresa ${process.env.APP} contém arquivos anexados ou solicita o preenchimento de senhas e informações cadastrais.`
        };
        transporter.sendMail(message_content, function (err) {
            if (err) {
                console.log("Erro ao enviar email:", err);
                res.status(200).json({
                    message: `E-mail não enviado, tente novamente ou contate ${process.env.EMAIL_ADM}`,
                });
                return;
            }
            else {
                res.status(200).json({
                    message: "Email enviado! Verifique sua caixa de entrada!",
                    urlRecoverPassword: `${data.urlRecoverPassword}?email=${data.email}&key=${user.recoverPassword}`,
                });
                return;
            }
        });
        res.status(200).json({
            message: "Gerado o link para recuperação de senha!",
            urlRecoverPassword: `${data.urlRecoverPassword}?email=${data.email}&key=${user.recoverPassword}`,
            key: user.recoverPassword,
        });
    }
    catch (error) {
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
export default router;
//# sourceMappingURL=AuthController.js.map