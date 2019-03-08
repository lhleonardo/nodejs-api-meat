import * as restify from 'restify'

export default abstract class Router { 
    abstract register(application: restify.Server) : void;
}