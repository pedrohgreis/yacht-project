import { Iate } from "../src/entity/Iate";
import { IateRepositorio } from "../src/repository/RepositoryIate";
import { IateService } from "../src/service/ServiceIate";
import { ClienteRepositorio } from "../src/repository/RepositoryCliente";
import { Alugueis } from "../src/repository/RepositoryAluguel";
import { Aluguel } from "../src/entity/Aluguel";

jest.mock('../src/repository/RepositoryIate');  // Mock do repositório
jest.mock('../src/repository/RepositoryCliente');

const aluguelRepositoryMock = {
    listAlugueisAtivos: jest.fn(),
};
const fiateRepositorioMock = {
    get: jest.fn(),
};
const clienteRepositoryMock = {
    get: jest.fn(),
};

const aluguelsAtivos = [
    {
        id: 1,
        cliente: { id: 1, nome: "Cliente A" },
        iate: { id: 1, marca: "Marca A", modelo: "Modelo A" },
        dataAluguel: new Date(),
        dataDevolucao: new Date(),
    },
    {
        id: 2,
        cliente: { id: 2, nome: "Cliente B" },
        iate: { id: 2, marca: "Marca B", modelo: "Modelo B" },
        dataAluguel: new Date(),
        dataDevolucao: new Date(),
    }
];

describe("IateService", () => {
    let serviceIate: IateService;
    let fiateRepositorioMock: jest.Mocked<IateRepositorio>;
    let aluguelRepositoryMock: any;
    let clienteRepositoryMock: jest.Mocked<ClienteRepositorio>;



    beforeEach(() => {
        
        // Inicializando o serviço e mock do repositório
        serviceIate = new IateService();
        fiateRepositorioMock = new IateRepositorio() as jest.Mocked<IateRepositorio>;
        aluguelRepositoryMock = new Alugueis() as jest.Mocked<Alugueis>;
        clienteRepositoryMock = new ClienteRepositorio() as jest.Mocked<ClienteRepositorio>;
        // Criar o mock do repositório de aluguel
        aluguelRepositoryMock = {
            listAlugueisAtivos: jest.fn()
        };

        // Substituindo os repositórios reais pelos mocks
        serviceIate['IateRepository'] = fiateRepositorioMock;
        serviceIate['AluguelRepository'] = aluguelRepositoryMock;
        serviceIate['ClienteRepository'] = clienteRepositoryMock;
    });

    afterEach(() => {
        // Limpar os mocks após cada teste
        jest.clearAllMocks();
    });

    it('deve criar um iate com dados válidos', async () => {
        const iate = new Iate('Modelo X', 'Marca Y', 2023, 10, 5, 50000);
        
        // Simulando o comportamento de create do repositório
        fiateRepositorioMock.create.mockResolvedValue(iate);

        const result = await serviceIate.create(iate);

        expect(result).toEqual(iate);  // Espera que o resultado seja o iate criado
        expect(fiateRepositorioMock.create).toHaveBeenCalledWith(iate);  // Verifica se o método foi chamado com o iate
    });

    it('não deve criar um iate com preço inválido', async () => {
        const iate = new Iate('Modelo X', 'Marca Y', 2023, 10, 5, -50000); // Preço inválido (negativo)

        await expect(serviceIate.create(iate)).rejects.toThrow();  // Espera que um erro seja lançado
        expect(fiateRepositorioMock.create).not.toHaveBeenCalled();  // Verifica que o repositório não foi chamado
    });

    it('deve listar todos os iates', async () => {
        const iate1 = new Iate('Modelo A', 'Marca A', 2020, 12, 8, 60000);
        const iate2 = new Iate('Modelo B', 'Marca B', 2021, 14, 10, 70000);
        const iates = [iate1, iate2];

        // Simulando o comportamento de list do repositório
        fiateRepositorioMock.list.mockResolvedValue(iates);

        const result = await serviceIate.list();

        expect(result).toEqual(iates);  // Espera que o resultado seja a lista de iates
        expect(fiateRepositorioMock.list).toHaveBeenCalled();  // Verifica se o método list foi chamado
    });

    it('deve atualizar um iate com dados válidos', async () => {
        const iateId = 1;
        const dadosAtualizacao = { preco: 55000 };
        const iateAtualizado = new Iate('Modelo X', 'Marca Y', 2023, 10, 5, 55000);
    

        fiateRepositorioMock.update = jest.fn().mockResolvedValue(iateAtualizado);
    

        const result = await serviceIate.update(iateId, dadosAtualizacao);
    
        expect(result).toEqual(iateAtualizado);
        expect(fiateRepositorioMock.update).toHaveBeenCalledWith(iateId, dadosAtualizacao);
    });

    it('não deve atualizar um iate com dados inválidos', async () => {
        const iateId = 1;
        const dadosAtualizacao = { preco: -55000 };

    
        await expect(serviceIate.update(iateId, dadosAtualizacao)).rejects.toThrow();
        expect(fiateRepositorioMock.update).not.toHaveBeenCalled();
    });

    it('deve remover um iate existente', async () => {
        const iate = new Iate();
        iate.id = 1;
        iate.modelo = "Modelo Teste";
        iate.marca = "Marca Teste";
        iate.ano = 2020;
        iate.comprimento = 10;
        iate.capacidade = 10;
        iate.preco = 10000;

        // Mock do comportamento do repositório
        fiateRepositorioMock.get.mockResolvedValue(iate); // Retorna o iate ao buscar pelo ID
        fiateRepositorioMock.remove.mockResolvedValue(iate); // Simula a remoção do iate

        const result = await serviceIate.remove(iate.id);

        expect(result).toBe(true);
        expect(fiateRepositorioMock.remove).toHaveBeenCalledWith(iate);
    });

    it('não deve remover um iate inexistente', async () => {
        const iateId = 999;  // ID de um iate inexistente

        // Simulando a busca do iate
        fiateRepositorioMock.search.mockResolvedValue([]);

        const result = await serviceIate.remove(iateId);

        expect(result).toBe(false);  // Espera que o resultado seja falso
        expect(fiateRepositorioMock.remove).not.toHaveBeenCalled();  // Verifica que o método remove não foi chamado
    });

    it("deve listar iates alugados com clientes", async () => {
        // Mock dos dados de aluguéis ativos, agora com todos os campos obrigatórios
        const aluguelsAtivos: Aluguel[] = [
            {
                id: 1,
                cliente: {
                    id: 1,
                    nome: "Cliente A",
                    cpf: "123.456.789-00",
                    idade: 30,
                    alugueis: [] 
                },
                iate: {
                    id: 1,
                    modelo: "Modelo A",
                    marca: "Marca A",
                    ano: 2020,
                    comprimento: 12,
                    capacidade: 8,
                    preco: 60000,
                    alugueis: null, 
                    funcionarios: [] 
                },
                dataAluguel: new Date(),
                dataDevolucao: new Date()
            },
            {
                id: 2,
                cliente: {
                    id: 2,
                    nome: "Cliente B",
                    cpf: "987.654.321-00",
                    idade: 25,
                    alugueis: []
                },
                iate: {
                    id: 2,
                    modelo: "Modelo B",
                    marca: "Marca B",
                    ano: 2021,
                    comprimento: 14,
                    capacidade: 10,
                    preco: 70000,
                    alugueis: null, 
                    funcionarios: []
                },
                dataAluguel: new Date(),
                dataDevolucao: new Date()
            }
        ];

        aluguelRepositoryMock.listAlugueisAtivos.mockResolvedValue(aluguelsAtivos);

        // Simular a busca de iates pelos IDs
        const iate1 = new Iate("Modelo A", "Marca A", 2020, 12, 8, 60000);
        iate1.id = 1;
        const iate2 = new Iate("Modelo B", "Marca B", 2021, 14, 10, 70000);
        iate2.id = 2;

        fiateRepositorioMock.get.mockResolvedValueOnce(iate1).mockResolvedValueOnce(iate2);

        const result = await serviceIate.listarIatesAlugados();

        // Verificar se o resultado contém os iates e clientes relacionados
        expect(result).toEqual([
            {
                iateId: 1,
                iateMarca: "Marca A",
                iateModelo: "Modelo A",
                clienteId: 1,
                clienteNome: "Cliente A"
            },
            {
                iateId: 2,
                iateMarca: "Marca B",
                iateModelo: "Modelo B",
                clienteId: 2,
                clienteNome: "Cliente B"
            }
        ]);

        expect(aluguelRepositoryMock.listAlugueisAtivos).toHaveBeenCalled();
        expect(fiateRepositorioMock.get).toHaveBeenCalledTimes(2);
    });

    it("deve lidar com erros ao listar iates alugados", async () => {
        // Simular um erro ao listar os aluguéis ativos
        aluguelRepositoryMock.listAlugueisAtivos.mockRejectedValue(new Error("Erro de banco de dados"));
    
        // Verificar se a função lança o erro com a mensagem correta
        await expect(serviceIate.listarIatesAlugados()).rejects.toThrow();
    
        // Verificar se os outros métodos não foram chamados
        expect(fiateRepositorioMock.get).not.toHaveBeenCalled();
        expect(clienteRepositoryMock.get).not.toHaveBeenCalled();
    });
    
});
