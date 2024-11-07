import { Router } from "express";
import { FuncionarioController } from "../controller/FuncionarioController";

const funcionarioController = new FuncionarioController();
const router = Router();

// Definindo as rotas para funcionário
router.post("/funcionario", (req, res) => {funcionarioController.create(req,res)}); // Criar funcionário
router.get("/funcionario", (req, res) => {funcionarioController.list(req,res)}); // Listar todos os funcionários
router.put("/funcionario", (req, res) => {funcionarioController.update(req,res)}); // Atualizar funcionário
router.delete("/funcionario", (req, res) => {funcionarioController.remove(req,res)}); // Remover funcionário

export default router;
