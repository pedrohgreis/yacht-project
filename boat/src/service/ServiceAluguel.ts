import { Aluguel } from "../entity/Aluguel";
import { Alugueis } from "../repository/RepositoryAluguel";
import { ClienteRepositorio } from "../repository/RepositoryCliente";
import { IateRepositorio } from "../repository/RepositoryIate";

export class ServiceAluguel {
    private aluguelRepositorio: Alugueis
    private clienteRepository: ClienteRepositorio
    private iateRepository: IateRepositorio

    constructor() {
        this.aluguelRepositorio = new Alugueis();
        this.clienteRepository = new ClienteRepositorio()
        this.iateRepository = new IateRepositorio()
    }

    private validaDatas(dataAluguel: Date, dataDevolucao: Date): boolean {
        return dataDevolucao >= dataAluguel;
    }

    private async validaCliente(cliente_id: number): Promise<boolean> {
        const aluguelAtivo = await this.aluguelRepositorio.encontrarCliente(cliente_id)
            
        if (aluguelAtivo) return false;
       return true;
    }

    private async validaIate(iate_id: number): Promise<boolean> {
        const aluguelIate = await this.aluguelRepositorio.encontrarIate(iate_id)
            
        if (aluguelIate) return false;
       return true;
    }

    async Tocreate(dadosAluguel: {
        clienteId: number;
        iateId: number;
        dataAluguel: Date;
        dataDevolucao: Date;
    }): Promise<Aluguel> {
        const { clienteId, iateId, dataAluguel, dataDevolucao } = dadosAluguel;

        if (!this.validaDatas(dataAluguel, dataDevolucao)) {
            throw new Error("A data de devolução deve ser antes da data de aluguel.");
        }

        if (!(await this.validaCliente(clienteId))){
            throw new Error("O cliente não pode ter uma aluguel já registrado!")
        }

        if (!(await this.validaIate(iateId))){
            throw new Error("Um iate só pode ser alugado por um cliente!")
        }

        const cliente = await this.clienteRepository.get(clienteId);
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        const iate = await this.iateRepository.get(iateId);
        if (!iate) {
            throw new Error("Iate não encontrado");
        }

        // Cria o aluguel associando o cliente e o iate
        const aluguel = new Aluguel();
        aluguel.cliente = cliente;
        aluguel.iate = iate;
        aluguel.dataAluguel = dataAluguel;
        aluguel.dataDevolucao = dataDevolucao;

        return await this.aluguelRepositorio.criar(aluguel);
    }

    async ToUpdate(id: number, aluguel: Partial<Aluguel>): Promise<void> {
        if (aluguel.dataAluguel && aluguel.dataDevolucao) {
            if (!this.validaDatas(aluguel.dataAluguel, aluguel.dataDevolucao)) {
                throw new Error("A data de devolução deve ser antes da data de aluguel.");
            }
        }

        try {
            await this.aluguelRepositorio.atualizar(id, aluguel);
            const aluguelAtualizado = await this.aluguelRepositorio.get(id);
            if (!aluguelAtualizado) {
                throw new Error("Aluguel não encontrado");
            }
        } catch (error) {
            throw new Error("Erro ao atualizar");
        }
    }

    async ToList(): Promise<Aluguel[]> {
        return await this.aluguelRepositorio.list();
    }

    async ToRemove(id: number): Promise<boolean> {
        const rent = await this.aluguelRepositorio.get(id);
        try {
            if (!rent) return false;

            await this.aluguelRepositorio.remover(rent);
            return true;
        } catch {
            throw new Error("Falha na remoção");
        }
    }
}