import { Clientes } from "../entity/Cliente";
import { ClienteRepositorio } from "../repository/RepositoryCliente";

export class ServiceClientes{
    private clienteRepository: ClienteRepositorio

    constructor(){
        this.clienteRepository = new ClienteRepositorio();
    }

    async ToCreate(c:Clientes): Promise<Clientes>{
        return await this.clienteRepository.create(c);
    }

    async ToList():Promise<Clientes[]>{
        return await this.clienteRepository.list()
    }

    async ToUpdate(id:number, cliente:Partial<Clientes>):Promise<void>{
        await this.clienteRepository.update(id,cliente);
    }

    async ToRemove(id:number):Promise<boolean>{
        const client = await this.clienteRepository.search({id:id})
        if(!client){
            return false;
        }

        await this.clienteRepository.remove(client);
        return true;
    }
}