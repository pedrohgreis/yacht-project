import { Request, Response } from "express";
import { ServiceAluguel } from "../service/ServiceAluguel";

const aluguelService = new ServiceAluguel();

export class AluguelController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const aluguel = req.body;
      const novoAluguel = await aluguelService.Tocreate(aluguel);
      return res.status(201).json(novoAluguel);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const alugueis = await aluguelService.ToList();
      return res.status(200).json(alugueis);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const dadosAtualizacao = req.body;
      await aluguelService.ToUpdate(id, dadosAtualizacao);
      return res.status(200).json({ message: "Aluguel atualizado com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const sucesso = await aluguelService.ToRemove(id);
      if (!sucesso) {
        return res.status(404).json({ message: "Aluguel não encontrado" });
      }
      return res.status(200).json({ message: "Aluguel removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
