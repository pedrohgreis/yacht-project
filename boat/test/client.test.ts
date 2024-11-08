import { Clientes } from '../src/entity/Cliente';
import { ServiceClientes } from '../src/service/ServiceCliente';
import { ClienteRepositorio } from '../src/repository/RepositoryCliente';

jest.mock('../src/repository/RepositoryCliente'); // Mock do repositório

describe('ServiceClientes', () => {
    let serviceClientes: ServiceClientes;
    let clienteRepositorioMock: jest.Mocked<ClienteRepositorio>;

    beforeEach(() => {
    
        serviceClientes = new ServiceClientes();
        clienteRepositorioMock = new ClienteRepositorio() as jest.Mocked<ClienteRepositorio>;
        serviceClientes['clienteRepository'] = clienteRepositorioMock;
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Ignora os logs
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restaura o comportamento original do console.log
        jest.clearAllMocks();
    });

    it('deve criar um cliente com CPF e idade válidos', async () => {
        const cliente = new Clientes('João', '123456', 25);
        clienteRepositorioMock.create.mockResolvedValue(cliente);

        const resultado = await serviceClientes.ToCreate(cliente);

        expect(resultado).toEqual(cliente);
        expect(clienteRepositorioMock.create).toHaveBeenCalledWith(cliente);
    });

    it('deve falhar ao criar um cliente com CPF inválido', async () => {
        const cliente = new Clientes('João', '123', 25);

        await expect(serviceClientes.ToCreate(cliente)).rejects.toThrow('CPF inválido');
        expect(clienteRepositorioMock.create).not.toHaveBeenCalled();
    });

    it('deve falhar ao criar um cliente com idade abaixo de 18', async () => {
        const cliente = new Clientes('João', '123456', 17);

        await expect(serviceClientes.ToCreate(cliente)).rejects.toThrow('Idade não permitida para aluguel');
        expect(clienteRepositorioMock.create).not.toHaveBeenCalled();
    });

    it('deve lançar erro se o cliente não for encontrado', async () => {
        const clienteId = 1;
        const dadosAtualizacao = { idade: 25 };
    
        // Mock para simular que o cliente não existe
        clienteRepositorioMock.get.mockResolvedValue(null); // Nenhum cliente encontrado
        clienteRepositorioMock.update.mockResolvedValue(undefined); // Não faz nada no update
    
        await expect(serviceClientes.ToUpdate(clienteId, dadosAtualizacao))
            .rejects.toThrow("Cliente não encontrado");
    });

    it('deve falhar ao atualizar um cliente com idade abaixo de 18', async () => {
        const clienteId = 1;
        const dadosAtualizacao = { idade: 17 };

        await expect(serviceClientes.ToUpdate(clienteId, dadosAtualizacao)).rejects.toThrow('Idade não permitida para aluguel');
        expect(clienteRepositorioMock.update).not.toHaveBeenCalled();
    });
});