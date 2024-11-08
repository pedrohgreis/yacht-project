import { Router } from "express";
import { AluguelController } from "../controller/AluguelController";


const aluguelController = new AluguelController();
const routerAluguel = Router();

routerAluguel.post("/", (req, res) => {aluguelController.create(req,res)}); 
routerAluguel.get("/", (req, res) => {aluguelController.list(req,res)}); 
routerAluguel.put("/:id", (req, res) => {aluguelController.update(req,res)});
routerAluguel.delete("/:id", (req, res) => {aluguelController.remove(req,res)}); 

export default routerAluguel;