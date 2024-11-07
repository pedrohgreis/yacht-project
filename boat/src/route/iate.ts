import { Router } from "express";
import { IateController } from "../controller/IateController";

const iateController = new IateController();
const router = Router();

// Definindo as rotas para Iates
router.post("/iates", (req, res) => {iateController.create(req,res)}); // Criar Iate
router.get("/iates", (req, res) => {iateController.list(req,res)}); // Listar todos os Iates
router.put("/iates:id", (req, res) => {iateController.update(req,res)}); // Atualizar Iate
router.delete("/iates:id", (req, res) => {iateController.remove(req,res)}); // Remover Iate

export default router;