import ServerInitializer from './server/init'
import { usersRouter } from "./users/users.routes"

let inicializador = new ServerInitializer();

inicializador
    .initialize([usersRouter])
    .then(result => {
        console.log("O servidor está rodando em: ", result.getServer().address());
    })
    .catch(erro => {
        console.log("Falha ao iniciar o servidor!");
        console.error(erro);
        process.exit(1);
    });