import { Iate } from "../entity/Iate";
import { IateRepositorio } from "../repository/RepositoryIate";
import { Alugueis } from "../repository/RepositoryAluguel"; 
import { ClienteRepositorio } from "../repository/RepositoryCliente"; 

export class IateService {

    private IateRepository: IateRepositorio;
    private AluguelRepository: Alugueis;
    private ClienteRepository: ClienteRepositorio;

    constructor() {
        this.IateRepository = new IateRepositorio();
        this.AluguelRepository = new Alugueis();
        this.ClienteRepository = new ClienteRepositorio();
    }

    private validarPreco(iate: Iate) {
        const preco = iate.preco;
        if (preco > 0) {
            return true;
        } else {
            throw new Error("Preço inválido");
        }
    }

    private validarCapacidade(iate: Iate) {
        const capa = iate.capacidade;
        if (capa > 0) {
            return true;
        } else {
            throw new Error("Capacidade inválida");
        }
    }

    private validarComprimento(iate: Iate) {
        const comp = iate.comprimento;
        if (comp > 0) {
            return true;
        } else {
            throw new Error("Comprimento inválido");
        }
    }

    async create(iate: Iate): Promise<Iate> {
        try {
            // Validações
            const prec = this.validarPreco(iate);
            const capa = this.validarCapacidade(iate);
            const comp = this.validarComprimento(iate);

            if (prec && capa && comp) {
                return await this.IateRepository.criar(iate);
            }
        } catch (error) {
            console.error("Erro ao criar Iate:", error.message);
            throw error;
        }
    }

    async list(): Promise<Iate[]> {
        try {
            return await this.IateRepository.list();
        } catch (error) {
            console.error("Erro ao listar Iates:", error.message);
            throw error;
        }
    }

    async update(iateId: number, dadosAtualizacao: Partial<Iate>): Promise<Iate> {
        try {
            if (dadosAtualizacao.preco !== undefined && dadosAtualizacao.preco < 0) {
                throw new Error('Preço não pode ser negativo');
            }
            return await this.IateRepository.atualizar(iateId, dadosAtualizacao);
        } catch (error) {
            console.error("Erro ao atualizar Iate:", error.message);
            throw error;
        }
    }

    async remove(id: number): Promise<boolean> {
        try {
            const Iate = await this.IateRepository.get(id);
            if (!Iate) {
                return false;
            }
            await this.IateRepository.remover(Iate);
            return true;
        } catch (error) {
            console.error("Erro ao remover Iate:", error.message);
            throw error;
        }
    }

    async listarIatesAlugados(): Promise<any[]> {
        try {
            // Buscar os aluguéis ativos
            const aluguelsAtivos = await this.AluguelRepository.listAlugueisAtivos();
            const iatesAlugadosComClientes = [];
    
            for (const aluguel of aluguelsAtivos) {
                const iate = await this.IateRepository.get(aluguel.iate.id);
                const cliente = await this.ClienteRepository.get(aluguel.cliente.id);
    
                if (iate && cliente) {
                    iatesAlugadosComClientes.push({
                        iateId: iate.id,
                        iateMarca: iate.marca,
                        iateModelo: iate.modelo,
                        clienteId: cliente.id,
                        clienteNome: cliente.nome,
                    });
                }
            }
    
            return iatesAlugadosComClientes;
    
        } catch (error) {
            console.error("Erro ao listar Iates alugados:", error.message);
            
            // Se o erro for de banco de dados, altere a mensagem do erro aqui
            if (error.message.includes("database")) {
                throw new Error("Erro de banco de dados");
            }
            
            throw new Error("Erro ao listar Iates alugados");
        }
    }
    
}
