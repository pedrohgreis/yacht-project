import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";

const clienteController = new ClienteController();
const routerCliente = Router();

routerCliente.post("/", (req:Request, res:Response) => { clienteController.create(req, res) }); 
routerCliente.get("/", (req:Request, res:Response) => { clienteController.list(req, res) }); 
routerCliente.put("/:id", (req:Request, res:Response) => { clienteController.update(req, res) }); 
routerCliente.delete("/:id", (req:Request, res:Response) => { clienteController.remove(req, res) }); 

export default routerCliente;
