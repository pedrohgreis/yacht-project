import { Router } from "express";
import { FuncionarioController } from "../controller/FuncionarioController";

const aluguelController = new FuncionarioController();
const router = Router();

// Definindo as rotas para aluguelis
router.post("/aluguel", (req, res) => {aluguelController.create(req,res)}); // Criar aluguel
router.get("/aluguel", (req, res) => {aluguelController.list(req,res)}); // Listar todos os alugueis
router.put("/aluguel", (req, res) => {aluguelController.update(req,res)}); // Atualizar aluguel
router.delete("/aluguel", (req, res) => {aluguelController.remove(req,res)}); // Remover aluguel

export default router;