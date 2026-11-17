import express from "express";

import type { Request, Response } from "express";

import { AppDataSource } from "../data-source.js";

import { User } from "../entity/Users.js";

import { PaginationService, PaginationError } from "../services/PaginationService.js";

import * as yup from 'yup';

import { Not } from "typeorm";

import bcrypt from "bcryptjs";

import { verifyToken } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/users", verifyToken, async (req: Request, res: Response) => {
    try { 
        const userRepository = AppDataSource.getRepository(User);

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(userRepository, page, limit, { id: "DESC" });

        res.status(200).json(result);
        return;
    } catch (error) {
       
            res.status(500).json({ messagem: "Erro ao listar usuários." });
            return;
        }   

});

router.get("/users/:id",verifyToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({
                messagem: "Usuário não encontrado."
            });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            messagem: "Erro ao consultar usuário."
        });
    }
});

router.post("/users",verifyToken, async (req: Request, res: Response) => {
    try {
        var data = req.body;

        const schema = yup.object().shape({

            name: yup.string().required("O campo name é obrigatório.").min(3, "O campo name deve ter pelo menos 3 caracteres."),
            email: yup.string().email("O campo email deve ser um email válido.").required("O campo email é obrigatório."),
            password: yup.string().required("O campo password é obrigatório.").min(6, "O campo password deve ter pelo menos 6 caracteres."),
            situation: yup.number().required("O campo situation é obrigatório.").positive("O campo situation deve ser um número positivo.").integer("O campo situation deve ser um número inteiro.")

        }); 

        await schema.validate( data, { abortEarly: false });


        const userRepository = AppDataSource.getRepository(User);

        const existingUser  = await userRepository.findOne({

            where: { email: data.email }

        })

        if (existingUser) {
            res.status(400).json({
                messagem: "Já existe um usuário com esse email."
            });
            return;
        }

        data.password = await bcrypt.hash(data.password, 10);




        const newUser = userRepository.create({
            name: data.name.trim(),
            email: data.email.trim(),
            situation: data.situation 
        });

        await userRepository.save(newUser);

        res.status(201).json({
            messagem: "Usuário cadastrado com sucesso!",
            user: newUser
        });
    } catch (error) {
        console.error(error);
        if (error instanceof yup.ValidationError) {
        
            res.status(400).json({
            messagem: error.errors
            });

        }


        res.status(500).json({
            messagem: "Erro ao cadastrar usuário."
        });
    }
});

router.put("/users-password/:id",verifyToken, async (req: Request, res: Response) => {

    try {

        const {id} = req.params;

        const data = req.body;

        const schema = yup.object().shape({
            password: yup.string().required("O campo password é obrigatório.").min(6, "O campo password deve ter pelo menos 6 caracteres.")
        });

        await schema.validate(data, { abortEarly: false });
        
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({
                messagem: "Usuário não encontrado."
            });
            return;
        }

        data.password = await bcrypt.hash(data.password, 10);

        userRepository.merge(user, data);

        const updatedUser = await userRepository.save(user);

        res.status(200).json({
            messagem: "Senha do usuário atualizada com sucesso!",
            user: updatedUser
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

router.put("/users/:id",verifyToken, async (req: Request, res: Response) => {
    try {


        const {id} = req.params;

        
        const data = req.body;

         const schema = yup.object().shape({

           name: yup.string().required("O campo name é obrigatório.").min(3, "O campo name deve ter pelo menos 3 caracteres."),
           email: yup.string().email("O campo email deve ser um email válido.").required("O campo email é obrigatório."),
           situation: yup.number().required("O campo situation é obrigatório.").positive("O campo situation deve ser um número positivo.").integer("O campo situation deve ser um número inteiro.")

        }); 

        await schema.validate(data, { abortEarly: false });

        const userRepository = AppDataSource.getRepository(User);


        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({
                messagem: "Usuário não encontrado."
            });
            return;
        }

         const existingUser = await userRepository.findOne({

            where: { email: data.email, 
                id: Not( Number(id)), 
            }

        })

        if (existingUser) {
            res.status(400).json({
                messagem: "Já existe um usuário com esse email."
            });
            return;
        }

        userRepository.merge(user, data);

        const updatedUser = await userRepository.save(user);

        res.status(200).json({
            messagem: "Usuário atualizado com sucesso!",
            user: updatedUser
        });
    } catch (error) {

         if (error instanceof yup.ValidationError) {
        
            res.status(400).json({
            messagem: error.errors
            });
            return;

        }

        console.error(error);

        res.status(500).json({
            messagem: "Erro ao editar usuário."
        });
    }
});

router.delete("/users/:id",verifyToken, async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({
                messagem: "Usuário não encontrado."
            });
            return;
        }

        await userRepository.remove(user);

        res.status(200).json({
            messagem: "Usuário removido com sucesso!"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            messagem: "Erro ao remover usuário."
        });
    }
});



export default router;