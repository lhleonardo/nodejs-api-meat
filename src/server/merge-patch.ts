import * as r from "restify";

const mpContent = "application/merge-patch+json";

export const mergePatchBodyParser = (request: r.Request, response: r.Response, next: r.Next) => {
    try {
        // apenas por segurança...
        (<any> request).rawBody = request.body;

        if (request.getContentType() == mpContent && request.method == "PATCH") {
            request.body = JSON.parse(request.body);
        }
        return next();
    } catch (error) {
        return next(new Error(`Invalid content: ${error.message}`));
    }
};