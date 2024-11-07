import { Iate } from "../src/entity/Iate";
import { IateRepositorio } from "../src/repository/RepositoryIate";
import { IateService } from "../src/service/ServiceIate";

jest.mock('../src/repository/RepositoryIate');  // Mock do repositório

describe("IateService", () => {
    let serviceIate: IateService;
    let fiateRepositorioMock: jest.Mocked<IateRepositorio>;

    beforeEach(() => {
        // Inicializando o serviço e mock do repositório
        serviceIate = new IateService();
        fiateRepositorioMock = new IateRepositorio() as jest.Mocked<IateRepositorio>;
        serviceIate['IateRepository'] = fiateRepositorioMock;
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

    
        await expect(serviceIate.update(iateId, dadosAtualizacao)).rejects.toThrow('Dados inválidos: preço não pode ser negativo');
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
});
