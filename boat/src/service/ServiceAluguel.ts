import { Aluguel } from "../entity/Aluguel";
import { Alugueis } from "../repository/RepositoryAluguel";

export class ServiceAluguel {
    private aluguelRepositorio: Alugueis;

    constructor() {
        this.aluguelRepositorio = new Alugueis();
    }

    private validaDatas(dataAluguel: Date, dataDevolucao: Date): boolean {
        return dataDevolucao >= dataAluguel;
    }

    private async validaAluguel(a: Aluguel){
       if(a.cliente.alugueis = []){
        return true;
       }
    }

    async Tocreate(a: Aluguel): Promise<Aluguel> {
        if (!this.validaDatas(a.dataAluguel, a.dataDevolucao)) {
            throw new Error("A data de devolução deve ser posterior ou igual à data de aluguel.");
        }

        if(!this.validaAluguel(a)){
            throw new Error()
        }

        try {
            return await this.aluguelRepositorio.create(a);
        } catch {
            throw new Error("Falha ao criar aluguel");
        }
    }

    async ToUpdate(id: number, aluguel: Partial<Aluguel>): Promise<void> {
        if (aluguel.dataAluguel && aluguel.dataDevolucao) {
            if (!this.validaDatas(aluguel.dataAluguel, aluguel.dataDevolucao)) {
                throw new Error("A data de devolução deve ser posterior à data de aluguel.");
            }
        }
    
        try {
            await this.aluguelRepositorio.update(id, aluguel);
            const aluguelAtualizado = await this.aluguelRepositorio.get(id); // ou get, se preferir
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

            await this.aluguelRepositorio.remove(rent);
            return true;
        } catch {
            throw new Error("Falha na remoção");
        }
    }
}