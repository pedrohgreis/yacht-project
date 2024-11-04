import { Iate } from "../entity/Iate";
import { IateRepositorio } from "../repository/RepositoryIate";

export class IateService{

    private IateRepository: IateRepositorio;

    constructor(){
        this.IateRepository = new IateRepositorio();
    }

    async criar(iate: Iate): Promise<Iate> {
        return await this.IateRepository.criar(iate);
    }

    async listar(): Promise<Iate[]> {
        return await this.IateRepository.listar();
    }

    async atualizar(id: number, iate: Partial<Iate>): Promise<void> {
        await this.IateRepository.atualizar(id, iate);
    }

    async remover(id: number): Promise<boolean> {
        const Iate = await this.IateRepository.pesquisar({ id: id });
        if (!Iate) {
            return false;
        }
        await this.IateRepository.remover(Iate);
        return true;
    }
}