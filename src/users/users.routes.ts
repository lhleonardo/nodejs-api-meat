import Router from "../common/router"
import { Users } from "./users.model"

import * as restify from "restify"

class UsersRouter extends Router {

    register(application: restify.Server): void {
        application.get("/users", (request, response, next) => {
            Users
                .findAll()
                .then(resultado => {
                    response.json(resultado);
                    return next();
                });
        });

        application.get("/users/:id", (request, response, next) => {
            Users
                .findById(request.params.id)
                .then(resultado => {
                    response.json(resultado);
                    return next();
                })
                .catch(() => {
                    response.send(404, { message: "Não foi encontrado um usuário com id " + request.params.id });
                    return next();
                })
        });
    }

}

export const usersRouter = new UsersRouter;