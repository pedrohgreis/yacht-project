import { Router } from "express";
import { IateController } from "../controller/IateController";

const iateController = new IateController();
const routerIate = Router();

// Definindo as rotas para Iates
routerIate.post("/", (req, res) => {iateController.create(req,res)}); // Criar Iate
routerIate.get("/", (req, res) => {iateController.list(req,res)}); // Listar todos os Iates
routerIate.put("/:id", (req, res) => {iateController.update(req,res)}); // Atualizar Iate
routerIate.delete("/:id", (req, res) => {iateController.remove(req,res)}); // Remover Iate

export default routerIate;