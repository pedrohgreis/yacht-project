import "reflect-metadata";
import { banco } from "./data-source";
import { Clientes } from "./entity/Cliente";
import { ServiceClientes } from "./service/ServiceCliente";
import { Iate } from "./entity/Iate";
import { IateService } from "./service/ServiceIate";
import { Funcionario } from "./entity/Funcionario";
import { ServiceFuncionarios } from "./service/ServiceFuncionario";
import { Aluguel } from "./entity/Aluguel";
import { ServiceAluguel } from "./service/ServiceAluguel";

banco.initialize()
    .then(async () => {
        const serviceClientes = new ServiceClientes();
        const serviceFuncionario = new ServiceFuncionarios();
        const serviceIate = new IateService();
        const serviceAluguel = new ServiceAluguel();

        // 1. criar cliente
        const cliente1 = new Clientes();
        cliente1.nome = "João Paulo";
        cliente1.cpf = "123456";
        cliente1.idade = 25;
        cliente1.alugueis = [];

        const cliente2 = new Clientes();
        cliente2.nome = "Matheus Gomes";
        cliente2.cpf = "678910";
        cliente2.idade = 19;
        cliente2.alugueis = [];

        const cliente3 = new Clientes();
        cliente3.nome = "Marcos Silveira";
        cliente3.cpf = "678910";
        cliente3.idade = 17;
        cliente3.alugueis = [];

        // 2. Funcionario
        const funcionario1 = new Funcionario();
        funcionario1.nome = "Carlos Henrique";
        funcionario1.cpf = "321789";
        funcionario1.cargo = "Piloto";
        funcionario1.iates = [];

        const funcionario2 = new Funcionario();
        funcionario2.nome = "Mário Ferreira";
        funcionario2.cpf = "216598";
        funcionario2.cargo = "Piloto";
        funcionario2.iates = [];

        const funcionario3 = new Funcionario();
        funcionario3.nome = "Bruno Carlos";
        funcionario3.cpf = "789634";
        funcionario3.cargo = "Manutenção";
        funcionario3.iates = [];

        const funcionario4 = new Funcionario();
        funcionario4.nome = "Gabriel Silva";
        funcionario4.cpf = "200368";
        funcionario4.cargo = "Manutenção";
        funcionario4.iates = [];

        // 3. Iates
        const iate1 = new Iate();
        iate1.capacidade = 12;
        iate1.comprimento = 50;
        iate1.ano = 2022;
        iate1.marca = "Fibrafort";
        iate1.modelo = "newYachte";
        iate1.preco = 3200;
        iate1.funcionarios = [];

        const iate2 = new Iate();
        iate2.capacidade = 15;
        iate2.comprimento = 55;
        iate2.ano = 2023;
        iate2.marca = "Azimut Yachts";
        iate2.modelo = "YachteVegas";
        iate2.preco = 4000;
        iate2.funcionarios = [];

        const iate3 = new Iate();
        iate3.capacidade = 10;
        iate3.comprimento = 45;
        iate3.ano = 2018;
        iate3.marca = "Estaleiro NHD";
        iate3.modelo = "YachteLA";
        iate3.preco = 3000;
        iate3.funcionarios = [];

        const iate4 = new Iate();
        iate4.capacidade = 20;
        iate4.comprimento = 60;
        iate4.ano = 2014;
        iate4.marca = "Ferretti Yatchs";
        iate4.modelo = "YachteNY";
        iate4.preco = 5200;
        iate4.funcionarios = [];

        // Criando aluguel
        const aluguel1 = new Aluguel();
        aluguel1.dataAluguel = new Date();
        aluguel1.dataDevolucao = new Date(aluguel1.dataAluguel.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 dias após
        aluguel1.cliente = cliente1;
        aluguel1.iate = iate1;

        const aluguel2 = new Aluguel();
        aluguel2.dataAluguel = new Date();
        aluguel2.dataDevolucao = new Date(aluguel2.dataAluguel.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 dias após
        aluguel2.cliente = cliente2;
        aluguel2.iate = iate2;

        const aluguel3 = new Aluguel();
        aluguel3.dataAluguel = new Date();
        aluguel3.dataDevolucao = new Date(aluguel3.dataAluguel.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 dias após
        aluguel3.cliente = cliente3;
        aluguel3.iate = iate3;

        // Criação de dados
        try {
            // Cliente
            await serviceClientes.ToCreate(cliente1);
            await serviceClientes.ToCreate(cliente2);
            console.log("Clientes criados com sucesso");

            // Funcionário
            await serviceFuncionario.ToCreate(funcionario1);
            console.log("Funcionário criado com sucesso");

            // Iates
            await serviceIate.create(iate1);
            console.log("Iate criado com sucesso");

            // Aluguel
            await serviceAluguel.Tocreate(aluguel1);
            console.log("Aluguel criado com sucesso");

            // Atualizar um cliente
            cliente1.nome = "Pedro Paulo";
            cliente1.cpf = "703492";
            cliente1.idade = 37;
            await serviceClientes.ToUpdate(cliente1.id, cliente1); // Corrigir aqui para ToUpdate, não ToCreate
            console.log("Cliente atualizado com sucesso");

            // Atualizar funcionário
            funcionario1.cargo = "Gerente";
            await serviceFuncionario.ToUpdate(funcionario1.id, funcionario1); // Corrigir aqui para ToUpdate, não ToCreate
            console.log("Funcionário atualizado com sucesso");

            // Atualizar um Iate (Exemplo)
            iate1.preco = 3500;
            await serviceIate.update(iate1.id, iate1); // Corrigir aqui para o método correto (update)
            console.log("Iate atualizado com sucesso!");

            // Atualizar aluguel
            aluguel1.dataDevolucao = new Date(aluguel1.dataAluguel.getTime() + 1000 * 60 * 60 * 24 * 14); // 14 dias após
            await serviceAluguel.ToUpdate(aluguel1.id, aluguel1);
            console.log("Aluguel atualizado com sucesso!");

            // Deletar um cliente
            await serviceClientes.ToRemove(cliente2.id);
            console.log("Cliente excluído com sucesso");

            // Deletar um funcionário
            await serviceFuncionario.ToRemove(funcionario3.id);
            console.log("Funcionário excluído com sucesso");

            // Deletar Iate (Exemplo)
            await serviceIate.remove(iate1.id);
            console.log("Iate deletado com sucesso!");

            // Deletar Aluguel (Exemplo)
            await serviceAluguel.ToRemove(aluguel1.id);
            console.log("Aluguel deletado com sucesso!");

        } catch (error) {
            console.error("Erro ao realizar operações:", error.message);
        }

        //listar iates alugados
        const iatesAlugados = await serviceIate.listarIatesAlugados();
        console.log(iatesAlugados);
    })
    
    .catch((error) => console.log("Erro ao inicializar o banco de dados:", error));
