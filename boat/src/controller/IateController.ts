import {Request,Response} from 'express';
import { IateService } from "../service/ServiceIate";
import { Iate } from '../entity/Iate';
import { create } from 'domain';

const iateService = new IateService();

export class IateController{

    async create(req:Request, res:Response){
        try{
            const iate = req.body;
            const novoIate = await iateService.create(iate);
            res.status(201).json(novoIate);
        } catch(error){
            console.log(error.message);
            res.status(400).json({message:error});
        }
    }

    async list(req:Request, res:Response){
        try{
            const iates = await iateService.list();
            res.status(200).json(iates);
        } catch(error){
            console.log(error.message);
            res.status(500).json({message:error});
        }
    }

    async update(req:Request, res:Response){
        const {id} = req.params;
        const iateAtualizar = req.body;

        try{
            const iateAtualizado = await iateAtualizar(Number(id), iateAtualizar);
            res.status(200).json({message: "Iate Atualizado"});
        } catch(error){
            console.log(error.message);
            res.status(400).json({message:error});
        }
    }

    async remove(req:Request, res:Response){
        const {id} = req.params;

        try{
            const iateRemover = await iateService.remove(Number(id));
            if(!iateRemover){
                res.status(400).json({message:"Iate não encontrado"});
            }
            res.status(200).json({message: "Iate removido"});
        } catch(error){
            console.log(error.message);
            res.status(400).json({message: error});
        }
    }

}

