import { Router } from "express";
import { FuncionarioController } from "../controller/FuncionarioController";

const aluguelController = new FuncionarioController();
const routerAluguel = Router();

routerAluguel.post("/", (req, res) => {aluguelController.create(req,res)}); 
routerAluguel.get("/", (req, res) => {aluguelController.list(req,res)}); 
routerAluguel.put("/", (req, res) => {aluguelController.update(req,res)});
routerAluguel.delete("/", (req, res) => {aluguelController.remove(req,res)}); 

export default routerAluguel;