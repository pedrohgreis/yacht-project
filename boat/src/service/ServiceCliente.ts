import { Clientes } from "../entity/Cliente";
import { ClienteRepositorio } from "../repository/RepositoryCliente";

export class ServiceClientes{
    private clienteRepository: ClienteRepositorio
    private cliente:Clientes

    constructor(){
        this.clienteRepository = new ClienteRepositorio();
        
    }

    private ValidarCPF(): boolean{
        const cpf = this.cliente.cpf
        if((cpf.length === 6) && (!isNaN(parseFloat(cpf)))){
            return true;
        } else{
            throw new Error("CPF inválido");
        } 
    }

    private ValidarIDADE(idade:number):boolean{
        if(idade >= 18){
            console.log("Pode alugar o iate");  
            return true;
        } else{
            throw new Error("Idade não permitidada para aluguel")
        }
    }

    async ToCreate(c:Clientes): Promise<Clientes>{

        this.ValidarCPF();
        this.ValidarIDADE(c.idade);

        try{
            return await this.clienteRepository.create(c);
        } catch{
            throw new Error("Falha ao criar");
        }
    }

    async ToList():Promise<Clientes[]>{
        return await this.clienteRepository.list();
    }

    async ToUpdate(id:number, cliente:Partial<Clientes>):Promise<void>{
        if(cliente.idade !== undefined){
            this.ValidarIDADE(cliente.idade);
        }
        try{
            await this.clienteRepository.update(id,cliente);
        } catch{
            throw new Error("Erro ao atualizar");
        }
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