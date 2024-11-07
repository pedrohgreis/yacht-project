import { Router } from "express";
import { FuncionarioController } from "../controller/FuncionarioController";

const aluguelController = new FuncionarioController();
const routerAluguel = Router();

// Definindo as rotas para aluguelis
routerAluguel.post("/", (req, res) => {aluguelController.create(req,res)}); // Criar aluguel
routerAluguel.get("/", (req, res) => {aluguelController.list(req,res)}); // Listar todos os alugueis
routerAluguel.put("/", (req, res) => {aluguelController.update(req,res)}); // Atualizar aluguel
routerAluguel.delete("/", (req, res) => {aluguelController.remove(req,res)}); // Remover aluguel

export default routerAluguel;