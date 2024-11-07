import "reflect-metadata";
import express from 'express';
import { banco } from "./data-source";
import routerAluguel from "./route/aluguelRoute";
import routerCliente from "./route/clienteRoute";
import routerFuncionario from "./route/funcionarioRoute";
import routerIate from "./route/iateRoute";


const Myapi = express();
Myapi.use(express.json());
Myapi.use('/clientes', routerCliente);
Myapi.use('/funcionarios', routerFuncionario);
Myapi.use('/aluguel', routerAluguel);
Myapi.use('/iate', routerIate);

const port = 3000;

Myapi.listen(port, async () => {
    await banco.initialize().then(() => {
        console.log("Conexão com o banco de dados feita com sucesso");
    }).catch((erro) => console.log(erro));

    console.log("Servidor rodado na porta " + port);
    
});

