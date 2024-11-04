import { banco } from "../data-source";
import { DataSource, Repository } from "typeorm";
import { Empresa } from "../entity/Empresa";

interface IEmpresa {
    create(e: Empresa): Promise<Empresa>;
    listar(): Promise<Empresa>;
    obter(id: number): Promise<Empresa | null>;
    pesquisar(filtro: Partial<Empresa>): Promise<Empresa | null>;
    remover(empresa: Empresa): Promise<Empresa>;
    atualizar(id: number, dados: Partial<Empresa>): Promise<void>;
}

export class EmpresaRepository implements IEmpresa{
    private repositorio: Repository<Empresa>

    constructor(){
        this.repositorio = banco.getRepository(Empresa)
    }
}