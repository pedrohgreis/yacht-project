import {Request,Response} from 'express';
import { ServiceClientes } from '../service/ServiceCliente';


const serviceCliente = new ServiceClientes();

export class ClienteController{
    async create(req:Request, res:Response){
        try{
            const cliente = req.body;
            const novoCliente = await serviceCliente.ToCreate(cliente);

            res.status(201).json(novoCliente);
        } catch(error){
            console.log(error.message);
            res.status(400).json({message: error.message});
            
        }
    }

    async list(req:Request, res:Response){
        try{
            const clientes = await serviceCliente.ToList();
            res.status(200).json(clientes);
        } catch(error){
            console.log(error.message);
            res.status(500).json({message:error});
        }
    }

    async update(req:Request, res:Response){
        const {id} = req.params;
        const cliente = req.body;

        try{
            const clienteAtualizado = await serviceCliente.ToUpdate(Number(id),cliente);
            res.status(200).json({message: "Cliente atualizado"})
        } catch(error){
            console.log(error.message);
            res.status(400).json({message:error.message});
        }
    }

    async remove(req:Request, res:Response){
        const {id} = req.params;

        try{
            const sucesso = await serviceCliente.ToRemove(Number(id));

            if(!sucesso){
                return res.status(400).json({message: "Cliente não encontrado"});
            }

            res.status(200).json({message: "Clinete removido"})
        }catch(error){
            console.log(error);
            res.status(400).json({message: error.message})
        }
    }
}