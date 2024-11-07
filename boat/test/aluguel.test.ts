import { Aluguel } from "../src/entity/Aluguel";
import { Alugueis } from "../src/repository/RepositoryAluguel";
import { ServiceAluguel } from "../src/service/ServiceAluguel";

// Mock do repositório
jest.mock('../src/repository/RepositoryAluguel');

describe("ServiceAluguel", () => {
    let serviceAluguel: ServiceAluguel;
    let aluguelRepositorioMock: jest.Mocked<Alugueis>;

    beforeEach(() => {
        // Inicializando o serviço e mock do repositório
        serviceAluguel = new ServiceAluguel();
        aluguelRepositorioMock = new Alugueis() as jest.Mocked<Alugueis>;
        serviceAluguel['aluguelRepositorio'] = aluguelRepositorioMock;
    });

    afterEach(() => {
        // Limpar os mocks após cada teste
        jest.clearAllMocks();
    });

    describe("Tocreate", () => {
        it("deve criar um aluguel quando as datas forem válidas", async () => {
            const aluguel = new Aluguel();
            aluguel.dataAluguel = new Date("2024-11-01");
            aluguel.dataDevolucao = new Date("2024-11-10");

            aluguelRepositorioMock.create.mockResolvedValue(aluguel);

            const resultado = await serviceAluguel.Tocreate(aluguel);

            expect(resultado).toEqual(aluguel);
            expect(aluguelRepositorioMock.create).toHaveBeenCalledWith(aluguel);
        });

        it("deve lançar erro quando a data de devolução for anterior à data de aluguel", async () => {
            const aluguel = new Aluguel();
            aluguel.dataAluguel = new Date("2024-11-10");
            aluguel.dataDevolucao = new Date("2024-11-01");

            await expect(serviceAluguel.Tocreate(aluguel)).rejects.toThrow();
        });
    });

    describe("ToUpdate", () => {
        it("deve atualizar o aluguel com sucesso", async () => {
            const aluguel = new Aluguel();
            aluguel.dataAluguel = new Date("2024-11-01");
            aluguel.dataDevolucao = new Date("2024-11-10");
        
            aluguelRepositorioMock.update.mockResolvedValue(undefined); // Não retorna nada
            aluguelRepositorioMock.get.mockResolvedValue(aluguel); // Retorna o aluguel atualizado
        
            await serviceAluguel.ToUpdate(1, aluguel);
        
            // Verifica se o método update foi chamado corretamente
            expect(aluguelRepositorioMock.update).toHaveBeenCalledWith(1, aluguel);
        
            // Agora, verifica se o mock da função get foi chamado com o argumento esperado
            expect(aluguelRepositorioMock.get).toHaveBeenCalledWith(1); // ou { where: { id: 1 } }, se necessário
        });

        it("deve lançar erro quando as datas forem inválidas", async () => {
            const aluguel = new Aluguel();
            aluguel.dataAluguel = new Date("2024-11-10");
            aluguel.dataDevolucao = new Date("2024-11-01");

            await expect(serviceAluguel.ToUpdate(1, aluguel)).rejects.toThrow();
        });
    });

    describe("ToList", () => {
        it("deve listar todos os aluguéis", async () => {
            const alugueis = [new Aluguel(), new Aluguel()];

            aluguelRepositorioMock.list.mockResolvedValue(alugueis);

            const resultado = await serviceAluguel.ToList();

            expect(resultado).toEqual(alugueis);
            expect(aluguelRepositorioMock.list).toHaveBeenCalled();
        });
    });

    describe("ToRemove", () => {
        it("deve remover o aluguel com sucesso", async () => {
            const aluguel = new Aluguel();
            aluguel.id = 1;

            aluguelRepositorioMock.get.mockResolvedValue(aluguel);
            aluguelRepositorioMock.remove.mockResolvedValue(aluguel);

            const resultado = await serviceAluguel.ToRemove(1);

            expect(resultado).toBe(true);
            expect(aluguelRepositorioMock.remove).toHaveBeenCalledWith(aluguel);
        });

        it("deve retornar false quando o aluguel não existir", async () => {
            aluguelRepositorioMock.get.mockResolvedValue(null);

            const resultado = await serviceAluguel.ToRemove(999);

            expect(resultado).toBe(false);
        });

        it("deve lançar erro quando ocorrer um erro na remoção", async () => {
            const aluguel = new Aluguel();
            aluguel.id = 1;

            aluguelRepositorioMock.get.mockResolvedValue(aluguel);
            aluguelRepositorioMock.remove.mockRejectedValue(new Error("Falha na remoção"));

            await expect(serviceAluguel.ToRemove(1)).rejects.toThrow();
        });
    });
});
