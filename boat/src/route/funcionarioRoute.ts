import { Router } from "express";
import { FuncionarioController } from "../controller/FuncionarioController";

const funcionarioController = new FuncionarioController();
const routerFuncionario = Router();

routerFuncionario.post("/", (req, res) => {funcionarioController.create(req,res)});
routerFuncionario.get("/", (req, res) => {funcionarioController.list(req,res)}); 
routerFuncionario.put("/:id", (req, res) => {funcionarioController.update(req,res)}); 
routerFuncionario.delete("/:id", (req, res) => {funcionarioController.remove(req,res)}); 

export default routerFuncionario;
