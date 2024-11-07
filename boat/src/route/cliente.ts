import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";

const clienteController = new ClienteController();
const router = Router();

// Definindo as rotas para Clientes
router.post("/clientes", (req, res) => {clienteController.create(req,res)}); // Criar cliente
router.get("/clientes", (req, res) => {clienteController.list(req,res)}); // Listar todos os clientes
router.put("/clientes", (req, res) => {clienteController.update(req,res)}); // Atualizar cliente
router.delete("/clientes", (req, res) => {clienteController.remove(req,res)}); // Remover cliente

export default router;