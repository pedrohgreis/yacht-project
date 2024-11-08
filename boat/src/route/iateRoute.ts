import { Router } from "express";
import { IateController } from "../controller/IateController";

const iateController = new IateController();
const routerIate = Router();

routerIate.post("/", (req, res) => {iateController.create(req,res)}); 
routerIate.get("/", (req, res) => {iateController.list(req,res)}); 
routerIate.put("/:id", (req, res) => {iateController.update(req,res)}); 
routerIate.delete("/:id", (req, res) => {iateController.remove(req,res)}); 

export default routerIate;