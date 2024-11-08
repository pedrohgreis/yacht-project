import { Clientes } from "../entity/Cliente";
import { ClienteRepositorio } from "../repository/RepositoryCliente";

export class ServiceClientes {
    private clienteRepository: ClienteRepositorio;
    private cliente: Clientes;

    constructor(){
        this.clienteRepository = new ClienteRepositorio();
    }

    private ValidarCPF(cpf: string): boolean{
        if((cpf.length === 6) && (!isNaN(parseFloat(cpf)))) {
            return true;
        } else {
            throw new Error("CPF inválido");
        }
    }

    private ValidarIDADE(idade: number): boolean{
        if (idade >= 18) {
            console.log("Pode alugar o iate");
            return true;
        } else {
            throw new Error("Idade não permitida para aluguel");
        }
    }

    async ToCreate(c: Clientes): Promise<Clientes> {
        this.cliente = c;
        
        this.ValidarCPF(c.cpf);
        this.ValidarIDADE(c.idade);

        try {
            return await this.clienteRepository.criar(c);
        } catch {
            throw new Error("Falha ao criar");
        }
    }

    async ToList():Promise<Clientes[]>{
        return await this.clienteRepository.list();
    }

    async ToUpdate(id: number, cliente: Partial<Clientes>): Promise<void> {
        if (cliente.idade !== undefined) {
            this.ValidarIDADE(cliente.idade);
        }
        try {
            const resultado = await this.clienteRepository.atualizar(id, cliente);
            if (!resultado) {
                throw new Error("Cliente não encontrado");
            }
        } catch (error) {
            throw new Error(`Erro ao atualizar o cliente: ${error.message}`);
        }
    }
    

    async ToRemove(id: number): Promise<boolean> {
        const cliente = await this.clienteRepository.get(id);
        
        if (!cliente) {
            return false; 
        }
    
        await this.clienteRepository.remover(cliente);
        return true;
    }
}