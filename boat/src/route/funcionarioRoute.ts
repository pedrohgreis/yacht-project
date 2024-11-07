import { Router } from "express";
import { FuncionarioController } from "../controller/FuncionarioController";

const funcionarioController = new FuncionarioController();
const routerFuncionario = Router();

// Definindo as rotas para funcionário
routerFuncionario.post("/", (req, res) => {funcionarioController.create(req,res)}); // Criar funcionário
routerFuncionario.get("/", (req, res) => {funcionarioController.list(req,res)}); // Listar todos os funcionários
routerFuncionario.put("/", (req, res) => {funcionarioController.update(req,res)}); // Atualizar funcionário
routerFuncionario.delete("/", (req, res) => {funcionarioController.remove(req,res)}); // Remover funcionário

export default routerFuncionario;
