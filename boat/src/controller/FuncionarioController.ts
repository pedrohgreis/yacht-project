import {Request,Response} from 'express';
import { ServiceFuncionarios } from '../service/ServiceFuncionario';

const serviceFuncionario = new ServiceFuncionarios();

export class FuncionarioController{
    //criar funcionario
    async create(req:Request, res:Response){
        try{
            const funcionario = req.body;
            const novoFuncionario = await serviceFuncionario.ToCreate(funcionario);

            res.status(201).json(novoFuncionario);
        } catch(error){
            console.log(error.message);
            
            res.status(400).json({message:error});
        }
    }

    //listar funcionario
    async list(req:Request, res:Response){
        try{
            const funcionario = await serviceFuncionario.ToList()
            res.status(200).json(funcionario);
        } catch(error){
            console.log(error.message);
            res.status(500).json({message:error});
        }
    }

    async update(req:Request, res:Response){
        const {id} = req.params;
        const funcionarioAtualizado = req.body;

        try{
            const atualizar = await serviceFuncionario.ToUpdate(Number(id), funcionarioAtualizado);
            res.status(200).json({message:"Funcionario atualizado"});
        } catch(error){
            console.log(error.message);
            res.status(400).json({message: error});
        }
    }

    async remove(req:Request, res:Response){
        const {id} = req.params;

        try{
            const remover = await serviceFuncionario.ToRemove(Number(id));
            
            if(!remover){
                res.status(400).json({message: "Cliente não encontrado"});
            }
            res.status(200).json({message: "Funcionario removido"});

        } catch(error){
            console.log(error.message);
            res.status(400).json({message: error});
        }
    }
}