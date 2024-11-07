import { Request, Response } from 'express';
import { ServiceAluguel } from '../service/ServiceAluguel'; // Serviço de Aluguel
import { Aluguel } from '../entity/Aluguel'; // Modelo de Aluguel

export class AluguelController {
    private aluguelService: ServiceAluguel;

    constructor() {
        this.aluguelService = new ServiceAluguel();
    }

    // Método para listar todos os aluguéis
    public async listarAlugueis(req: Request, res: Response): Promise<Response> {
        try {
            const alugueis = await this.aluguelService.ToList();
            return res.status(200).json(alugueis);
        } catch (error) {
            console.error("Erro ao listar aluguéis:", error);
            return res.status(500).json({ message: "Erro ao listar aluguéis." });
        }
    }

    // Método para criar um novo aluguel
    public async criarAluguel(req: Request, res: Response): Promise<Response> {
        const { clienteId, iateId, dataAluguel, dataDevolucao } = req.body;

        const novoAluguel = new Aluguel();
        novoAluguel.id = clienteId;
        novoAluguel.id = iateId;
        novoAluguel.dataAluguel = new Date(dataAluguel);
        novoAluguel.dataDevolucao = new Date(dataDevolucao);

        try {
            const aluguelCriado = await this.aluguelService.Tocreate(novoAluguel);
            return res.status(201).json(aluguelCriado); // Retorna o aluguel criado
        } catch (error) {
            console.error("Erro ao criar aluguel:", error);
            return res.status(500).json({ message: error.message || "Erro ao criar aluguel." });
        }
    }

    // Método para atualizar um aluguel
    public async atualizarAluguel(req: Request, res: Response): Promise<Response> {
        const aluguelId = parseInt(req.params.id); 
        const { dataAluguel, dataDevolucao } = req.body;

        const dadosAtualizacao: Partial<Aluguel> = {};
        if (dataAluguel) dadosAtualizacao.dataAluguel = new Date(dataAluguel);
        if (dataDevolucao) dadosAtualizacao.dataDevolucao = new Date(dataDevolucao);

        try {
            await this.aluguelService.ToUpdate(aluguelId, dadosAtualizacao);
            return res.status(200).json({ message: "Aluguel atualizado com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar aluguel:", error);
            return res.status(500).json({ message: error.message || "Erro ao atualizar aluguel." });
        }
    }

    // Método para remover um aluguel
    public async removerAluguel(req: Request, res: Response): Promise<Response> {
        const aluguelId = parseInt(req.params.id); 

        try {
            const sucesso = await this.aluguelService.ToRemove(aluguelId);

            if (sucesso) {
                return res.status(200).json({ message: "Aluguel removido com sucesso" });
            } else {
                return res.status(404).json({ message: "Aluguel não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao remover aluguel:", error);
            return res.status(500).json({ message: error.message || "Erro ao remover aluguel." });
        }
    }
}
