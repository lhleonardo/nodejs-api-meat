import * as restify from 'restify'
import * as mongoose from "mongoose"

import Router from "../common/router"
import { config } from '../common/environment'

import { mergePatchBodyParser } from "./merge-patch"

export default class ServerInitializer {

    private application: restify.Server;

    private initDatabase(): Promise<any> {
        return mongoose.connect(config.db.url, { useNewUrlParser: true });
    }

    private initRoutes(routes: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer(({
                    name: config.api.name,
                    version: config.api.version
                }));

                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(mergePatchBodyParser)

                // chama o metodo para registrar cada uma das rotas
                routes.forEach(route => route.register(this.application));

                this.application.listen(config.server.port, () => {
                    resolve(this.application);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    public async initialize(routes: Router[] = []): Promise<ServerInitializer> {
        await Promise
            .all([
                this.initRoutes(routes),
                this.initDatabase()
            ]);
        return this;
    }

    public getServer(): restify.Server {
        return this.application;
    }
}