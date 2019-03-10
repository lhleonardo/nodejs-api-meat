import Router from "../common/router"
import { User } from "./users.model"

import * as restify from "restify"

class UsersRouter extends Router {

    private application: restify.Server;

    register(application: restify.Server): void {
        this.application = application;

        this.getUsers();
        this.getUserById();

        this.createUser();
        this.updateUser();
        this.updateAndOverwriteUser();

        this.deleteUser();
    }

    private getUsers() {
        this.application.get("/users", (request, response, next) => {
            User
                .find()
                .then(resultado => {
                    response.json(resultado);
                    return next();
                });
        });
    }

    private getUserById() {
        this.application.get("/users/:id", (request, response, next) => {
            User
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

    private createUser() {
        this.application.post("/users", (request, response, next) => {
            let newUser = new User(request.body);

            newUser
                .save()
                .then(saved => {
                    saved.password = undefined;

                    response.json(saved);

                    return next();
                })
                .catch(err => {
                    return next(err);
                });
        });
    }

    private updateUser() {
        this.application.patch("/users/:id", (request, response, next) => {
            User
                .findByIdAndUpdate(request.params.id, request.body, { new: true })
                .then(registroAtualizado => {
                    response.json(registroAtualizado);

                    return next();
                })
                .catch(err => {
                    response.send(404, { message: "Não existe um registro com o id informado para sofrer atualização." });
                })
        });
    }

    private updateAndOverwriteUser() {
        this
            .application
            .put("/users/:id", (req, res, next) => {
                User
                    .update({ _id: req.params.id }, req.body, { overwrite: true })
                    .exec()
                    .then(result => {
                        if (result.n) {
                            return User.findById(req.params.id);
                        }

                        res.send(404, { message: "Não existe um usuário que possua o id " + req.params.id });
                    })
                    .then(newDoc => {
                        res.json(newDoc);
                        return next();
                    })
            });
    }

    private deleteUser() {
        this.application.del("/users/:id", (request, response, next) => {
            User
                .remove({ _id: request.params.id })
                .exec()
                .then(respostaExclusao => {
                    if (respostaExclusao.n) {
                        response.send(204);
                    } else { 
                        response.send(404);
                    }
                    // response.send(respostaExclusao.result.n ? 204 : 404);

                })
                .catch(err => {
                    return next("Server error.");
                })
                return next();
        });
    }

}

export const usersRouter = new UsersRouter;