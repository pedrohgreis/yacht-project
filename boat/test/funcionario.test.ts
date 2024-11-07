import { Funcionario } from "../src/entity/Funcionario";
import { ServiceFuncionarios } from "../src/service/ServiceFuncionario";
import { FuncionarioRepositorio } from "../src/repository/RepositoryFuncionario";

jest.mock('../src/repository/RepositoryFuncionario');

describe("ServiceFuncionarios", () => {
    let serviceFuncionario: ServiceFuncionarios;
    let funcionarioRepositorioMock: jest.Mocked<FuncionarioRepositorio>;

    beforeEach(() => {
        // Inicializando o serviço e mock do repositório
        serviceFuncionario = new ServiceFuncionarios();
        funcionarioRepositorioMock = new FuncionarioRepositorio() as jest.Mocked<FuncionarioRepositorio>;
        serviceFuncionario['FuncionarioRepository'] = funcionarioRepositorioMock;
    });

    afterEach(() => {
        // Limpar os mocks após cada teste
        jest.clearAllMocks();
    });

    it("deve criar um novo funcionário", async () => {
        const novoFuncionario = new Funcionario("João", "Gerente", "123456");
        funcionarioRepositorioMock.create.mockResolvedValue(novoFuncionario);

        const funcionarioCriado = await serviceFuncionario.ToCreate(novoFuncionario);

        expect(funcionarioRepositorioMock.create).toHaveBeenCalledWith(novoFuncionario);
        expect(funcionarioCriado).toEqual(novoFuncionario);
    });

    it("deve lançar erro ao criar funcionário com CPF inválido", async () => {
        const novoFuncionario = new Funcionario("João", "Gerente", "123");
        try {
            await serviceFuncionario.ToCreate(novoFuncionario);
        } catch (error) {
            expect(error.message).toBe("CPF inválido");
        }
    });

    it("deve listar todos os funcionários", async () => {
        const funcionarios = [
            new Funcionario("João", "Gerente", "12345678901"),
            new Funcionario("Maria", "Assistente", "98765432100")
        ];
        funcionarioRepositorioMock.list.mockResolvedValue(funcionarios);

        const listaFuncionarios = await serviceFuncionario.ToList();

        expect(funcionarioRepositorioMock.list).toHaveBeenCalled();
        expect(listaFuncionarios).toEqual(funcionarios);
    });

    it("deve atualizar o cargo de um funcionário", async () => {
        const funcionario = new Funcionario("João", "Gerente", "12345678901");
        funcionario.id = 1; // Definindo um id para o funcionário
        const dadosAtualizacao = { cargo: "Diretor" };

        funcionarioRepositorioMock.update.mockResolvedValue(undefined);

        await serviceFuncionario.ToUpdate(funcionario.id, dadosAtualizacao);

        expect(funcionarioRepositorioMock.update).toHaveBeenCalledWith(funcionario.id, dadosAtualizacao);
    });

    it("deve lançar erro ao tentar atualizar cargo com valor inválido", async () => {
        const funcionario = new Funcionario("João", "Gerente", "12345678901");
        funcionario.id = 1;
        const dadosAtualizacao = { cargo: "Ger" }; // Cargo inválido

        try {
            await serviceFuncionario.ToUpdate(funcionario.id, dadosAtualizacao);
        } catch (error) {
            expect(error.message).toBe("Cargo não permitido");
        }
    });

    it("deve remover um funcionário", async () => {
        const funcionario = new Funcionario("João", "Gerente", "12345678901");
        funcionarioRepositorioMock.get.mockResolvedValue(funcionario);
        funcionarioRepositorioMock.remove.mockResolvedValue(funcionario);

        const resultado = await serviceFuncionario.ToRemove(funcionario.id);

        expect(funcionarioRepositorioMock.get).toHaveBeenCalledWith(funcionario.id);
        expect(funcionarioRepositorioMock.remove).toHaveBeenCalledWith(funcionario);
        expect(resultado).toBe(true);
    });

    it("deve retornar false se o funcionário não existir ao tentar remover", async () => {
        const funcionarioId = 999; // ID que não existe
        funcionarioRepositorioMock.get.mockResolvedValue(null);

        const resultado = await serviceFuncionario.ToRemove(funcionarioId);

        expect(funcionarioRepositorioMock.get).toHaveBeenCalledWith(funcionarioId);
        expect(resultado).toBe(false);
    });
});
